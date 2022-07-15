// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

const airportTimeZones = [
  ["PDX", '-07:00'],
	["FRA", '+02:00'],
	["LGW", '+00:00'],
	["BOS", '-04:00'],
	["LAX", '-07:00'],
	["SLC", '-06:00'],
	["SEA", '-07:00'],
	["SFO", '-07:00'],
];

type Data = {
  flightTime: string
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
	const {
		depapcode,
		depdate,
		deptime,
		arrapcode,
		arrdate,
		arrtime,
	} = req.query
  const deptimezone = airportTimeZones.find(atz => atz[0] === depapcode)[1]
	const arrtimezone = airportTimeZones.find(atz => atz[0] === arrapcode)[1]
	const depDateTime = new Date(`${depdate}T${deptime}${deptimezone}`)
	const arrDateTime = new Date(`${arrdate}T${arrtime}${arrtimezone}`)
	const timeDiff = arrDateTime - depDateTime;

  res.status(200).json({
		flightTime: new Date(timeDiff).toISOString().slice(11,19)
	})
}
