import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-static"; // defaults to auto

export async function GET(request: NextRequest) {
	// Get the host name from the request headers
	const url = new URL(request.url);
	const host = url.origin;

	return NextResponse.json({
		one: {
			id: `${host}/api/one`,
			en: `${host}/api/one?lang=en`,
		},
		all: {
			id: `${host}/api/all`,
			en: `${host}/api/all?lang=en`,
		},
	});
}
