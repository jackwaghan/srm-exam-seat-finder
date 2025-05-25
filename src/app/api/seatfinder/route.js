export const runtime = "edge";

import * as cheerio from "cheerio";
import {
  listUrls,
  fakeUserAgent,
  listTime,
  listVenues,
  sessionList,
} from "../../utils/data";

export async function POST(request) {
  const { registerNumber, date } = await request.json();

  // Validate input
  if (!registerNumber) {
    return Response.json(
      { error: "Invalid input. Please provide a register number." },
      { status: 400 }
    );
  }
  if (!date) {
    return Response.json(
      { error: "Invalid input. Please provide a date." },
      {
        status: 400,
      }
    );
  }

  // Run both sessions and also the URLs in parallel and return the first Seat found
  const seatResults = await Promise.all(
    sessionList.map((session) =>
      seatScraper({
        registerNumber,
        date,
        session,
        urls: listUrls,
      })
    )
  );

  // Filter out null results and return the first valid seat found
  const validSeats = seatResults.filter((result) => result !== null);
  if (validSeats.length === 0) {
    return Response.json(
      { error: "No seat found for the provided details." },
      { status: 404 }
    );
  }
  return Response.json(validSeats);

  async function seatScraper({ registerNumber, date, session, urls }) {
    const body = `dated=${encodeURIComponent(
      date
    )}&session=${encodeURIComponent(session)}&submit=`;

    const randomUserAgent =
      fakeUserAgent[Math.floor(Math.random() * fakeUserAgent.length)];

    async function fetchAndParse(singleUrl) {
      let venue = singleUrl.split("/")[3];
      const time = Date.now();
      try {
        const response = await fetch(singleUrl, {
          headers: {
            accept: "*/*",
            "content-type": "application/x-www-form-urlencoded",
            "user-agent": randomUserAgent,
          },
          body,
          method: "POST",
        });
        if (!response.ok) return null;
        const html = await response.text();
        const $ = cheerio.load(html);

        let seatInfo = null;
        $(".content-and-table").each((_, lookup) => {
          const roomInfo = $(lookup)
            .find("#datessesinfo h4")
            .text()
            .replace(/\s+/g, " ")
            .trim();
          const infoMatch = roomInfo.match(
            /ROOM NO:\s*([^\s]+)\s+DATE\s*:\s*([^\s]+)\s+SESSION\s*:\s*([^\s]+)/i
          );
          const roomNo = infoMatch ? infoMatch[1] : null;
          const date = infoMatch ? infoMatch[2] : null;
          const session = infoMatch ? infoMatch[3] : null;
          const examTime = listTime[session];
          const roomNoUpper = roomNo ? roomNo.toUpperCase() : "";
          if (roomNoUpper.startsWith("FSH")) venue = "fsh";
          else if (roomNoUpper.startsWith("B")) venue = "bio";
          else if (roomNoUpper.startsWith("TP2")) venue = "tp2";
          else if (roomNoUpper.startsWith("TP")) venue = "tp";

          $(lookup)
            .find("table tr")
            .each((_, tableRow) => {
              const cellValues = $(tableRow)
                .find("td")
                .map((idx, cell) => $(cell).text().trim())
                .get();
              if (cellValues.length > 2 && cellValues[2] === registerNumber) {
                seatInfo = {
                  venue: listVenues[venue],
                  session,
                  roomNo,
                  date,
                  seatNo: cellValues[1],
                  registerNumber: cellValues[2],
                };
                return false;
              }
              if (cellValues.length > 5 && cellValues[5] === registerNumber) {
                seatInfo = {
                  registerNumber: cellValues[5],
                  venue: listVenues[venue],
                  session,
                  roomNo,
                  date,
                  examTime,
                  seatNo: cellValues[4],
                  speed: Date.now() - time + "ms",
                };
                return false;
              }
            });
          if (seatInfo) return false;
        });
        return seatInfo;
      } catch {
        return null;
      }
    }

    const results = await Promise.all(urls.map(fetchAndParse));
    return results.find((result) => result !== null) || null;
  }
}
