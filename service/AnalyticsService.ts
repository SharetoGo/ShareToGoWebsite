import { db } from "@/lib/firebase";
import { 
  collection, 
  query, 
  where, 
  getDocs, 
  doc, 
  setDoc, 
  Timestamp,
  DocumentData
} from "firebase/firestore";

export const AnalyticsService = {
  /**
   * Main function to calculate and save monthly metrics.
   * This ensures the data in companies -> metrics -> monthly is accurate.
   */
  async updateCompanyMonthlyMetrics(companyId: string, companyName: string, yearMonth: string) {
    try {
      // 1. Setup Date Range for the specific month (e.g., "2026-03")
      const [year, month] = yearMonth.split("-").map(Number);
      const startOfMonth = new Date(year, month - 1, 1, 0, 0, 0);
      const endOfMonth = new Date(year, month, 0, 23, 59, 59);

      // 2. Fetch all users belonging to this company
      const usersRef = collection(db, "users");
      const usersQuery = query(usersRef, where("company", "==", companyName));
      const usersSnap = await getDocs(usersQuery);
      
      const companyUserIds = usersSnap.docs.map(d => d.id);
      const totalUsersInCompany = companyUserIds.length;

      if (totalUsersInCompany === 0) {
        return { success: false, message: "No users found for this company." };
      }

      // 3. Fetch all travels within the date range
      // We fetch all and filter by userId to ensure we only count company-specific trips
      const travelsRef = collection(db, "travels");
      const travelsQuery = query(
        travelsRef,
        where("travelDate", ">=", Timestamp.fromDate(startOfMonth)),
        where("travelDate", "<=", Timestamp.fromDate(endOfMonth))
      );
      const travelsSnap = await getDocs(travelsQuery);

      // 4. Filter travels to only include those created by this company's users
      const companyTravels = travelsSnap.docs
        .map(d => d.data())
        .filter(t => companyUserIds.includes(t.userId));

      // 5. Perform Precise Calculations
      const metrics = this.calculate(companyTravels, totalUsersInCompany, yearMonth);

      // 6. Save to the specific nested path requested:
      // companies/{id}/metrics/metrics/monthly/{yearMonth}
      const metricDocRef = doc(
        db, 
        "companies", companyId, 
        "metrics", "metrics", 
        "monthly", yearMonth
      );

      await setDoc(metricDocRef, metrics, { merge: true });

      return { success: true, data: metrics };
    } catch (error) {
      console.error("Error updating analytics:", error);
      throw error;
    }
  },

  /**
   * Internal logic for data aggregation
   */
  calculate(travels: DocumentData[], totalUsers: number, yearMonth: string) {
    const activeDriversSet = new Set<string>();
    let totalAvailableSeats = 0; // Total capacity offered
    let totalReservedSeats = 0;  // Seats actually taken
    let totalCo2Saved = 0;

    travels.forEach((t) => {
      // Track unique drivers
      if (t.userId) activeDriversSet.add(t.userId);

      // Calculate Seats:
      // Capacity = (Remaining Available) + (Already Taken)
      const taken = Number(t.carSeatsTaken) || 0;
      const available = Number(t.carSeatsAvailable) || 0;
      
      totalReservedSeats += taken;
      totalAvailableSeats += (taken + available);
      
      // Accumulate CO2
      totalCo2Saved += Number(t.co2SavedKg) || 0;
    });

    const activeDrivers = activeDriversSet.size;
    const totalTravels = travels.length;

    // Accuracy Check: Avoid division by zero
    const seatOccupancyRate = totalAvailableSeats > 0 
      ? (totalReservedSeats / totalAvailableSeats) * 100 
      : 0;

    const participationRate = totalUsers > 0 
      ? (activeDrivers / totalUsers) * 100 
      : 0;

    return {
      activeDrivers,                          // (int64)
      availableSeats: totalAvailableSeats,     // (int64)
      co2SavedKg: Number(totalCo2Saved.toFixed(2)), // (double) Cleaned decimals
      month: yearMonth,                       // (string) "2026-03"
      participationRate,                      // (double)
      reservedSeats: totalReservedSeats,       // (int64)
      seatOccupancyRate,                      // (double)
      totalTravels,                           // (int64)
      totalTrips: totalTravels,               // (int64)
      totalUsers,                             // (int64)
      updatedAt: Timestamp.now()              // (timestamp)
    };
  }
};