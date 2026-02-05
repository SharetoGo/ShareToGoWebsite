import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const userAgent = request.headers.get("user-agent") || "";

  const iosURL = "https://apps.apple.com/es/app/sharetogo/id6746420222";
  const androidURL = "https://play.google.com/store/apps/details?id=com.sharetogo.carpool&hl=es";

  const isIOS = /iPhone|iPad|iPod/i.test(userAgent);
  const isAndroid = /Android/i.test(userAgent);
  const isMacOS = /Macintosh/i.test(userAgent);
  const isWindows = /Windows/i.test(userAgent);
  const isLinux = /Linux/i.test(userAgent);

  if (isIOS || isMacOS) {
    // iOS devices and Mac desktop → App Store
    return NextResponse.redirect(iosURL, { status: 302 });
  } else if (isAndroid || isWindows || isLinux) {
    // Android devices, Linux and Windows desktop → Play Store
    return NextResponse.redirect(androidURL, { status: 302 });
  }

  // Fallback for other/unknown devices
  return NextResponse.redirect("https://sharetogo.es", { status: 302 });
}
