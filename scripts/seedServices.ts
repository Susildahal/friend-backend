import dotenv from "dotenv";
import client from "../src/config/sanity.js";

dotenv.config();

const newservicesData = [
  {
    id: 1,
    title: "Cost of Living",
    description: "Lower Bills · Greater Living",
    image: "images/services/Cost-of-living.jpg",
    link: "/cost-of-living",

    demands: [
      "Implement Strategic Measures To Address Unsustainable Rising Costs",
    ],
    demandText: null,
    references: [],

    details: {
      intro:
        "The Australian standard of living has fallen to an all-time low. Record numbers of people are struggling to afford basic needs such as housing, food, and healthcare.",

      sections: [
        {
          key: "expenses",
          title: "Living Expenses",
          text: null,
          list: [
            "Buy or Rent a Home",
            "Buy Groceries",
            "Prescribed Medication and Healthcare",
            "Utilities – Electricity, Gas, Water, Internet etc",
            "Petrol",
            "Public Transport and Road Tolls – Just to get to work",
            "School Fees, uniforms, books, and other necessities",
            "Council and Water Rates",
            "And the list continues.",
          ],
        },
        {
          key: "crisis",
          title: null,
          text: "Many Australians are now living in their cars, families are forced to choose between paying rent or buying medicine, and some are relying on charity organisations for support.",
          list: null,
        },
        {
          key: "causes",
          title: null,
          text: "Corporate profiteering and government expenditure have been identified as major contributors to Australia's inflation and the ongoing cost of living crisis.",
          list: null,
        },
      ],
    },
  },

  {
    id: 2,
    title: "Residential Housing",
    description: "Affordable Homes · Strong Communities",
    image: "images/services/residential-housing.jpg",
    link: "/residental-housing",

    demands: [
      "Decrease Demand And Increase Supply",
      "Australian Residential Housing For Australians Only",
    ],
    demandText: null,

    references: [],

    details: {
      intro: null,
      sections: [
        {
          key: "ownershipPolicy",
          title: null,
          text: "Residential properties can only be purchased and owned by Australian citizens and residents. Foreign investment in Australian residential housing must be completely abolished.",
          list: null,
        },
        {
          key: "taxation",
          title: "Taxation",
          text: "Foreign-owned Australian residential housing to incur:",
          list: [
            "Foreign Owned Tax",
            "Land Tax with no threshold eligibility",
            "Land Tax calculated based on number of properties owned and owner’s country of origin",
          ],
        },
        {
          key: "reinvestment",
          title: "Reinvestment",
          text: "Funds from these levies will be reinvested in:",
          list: [
            "Housing the underprivileged",
            "Developing new housing for Australians",
          ],
        },
        {
          key: "message",
          title: null,
          text: "No longer do we want to see Australians being pushed out of the housing market by overseas buyers and investors.",
          list: null,
        },
      ],
    },
  },

  {
    id: 3,
    title: "Illicit Drugs",
    description: "End Stigma · Embrace Reform",
    image: "images/services/legalise-drugs.avif",
    link: "/illicit-drugs",

    demands: [
      "Take Control Of Illicit Drugs",
      "Think Outside The Square",
      "Remove The Financial Incentive That Drives The ‘vibrant Multibillion-dollar Black-market Industry’",
    ],
    demandText: null,
    references: [],

    details: {
      intro: null,
      sections: [
        {
          key: "problem",
          title: null,
          text: "Making illicit drugs illegal has only created a multibillion-dollar black market controlled by organised crime groups, failing to stop consumption.",
          list: null,
        },
        {
          key: "report",
          title: "Report",
          text: "Australian Institute of Criminology – 'Estimating the costs of serious and organised crime in Australia, 2020–21'",
          list: [
            "TSOC groups traffic illicit drugs into Australia on an industrial scale.",
            "Australian consumers are willing to pay high street prices.",
            "Traffickers profit even from small shipments.",
            "Methylamphetamine poses the greatest harm.",
            "Demand is growing for other substances.",
          ],
        },
        {
          key: "impact",
          title: null,
          text: "Criminal groups continue importing and manufacturing, while users face unsafe and unregulated products.",
          list: null,
        },
        {
          key: "solution",
          title: "Legalisation Summary",
          text: "Legalising illicit drugs would:",
          list: [
            "Shut down TSOC groups, backyard labs, and street dealers.",
            "Allow government regulation of production and sale.",
            "Enable tracking and support for drug users.",
          ],
        },
        {
          key: "disclaimer",
          title: null,
          text: "Friends United does not endorse drug use but recognises the need for more effective approaches.",
          list: null,
        },
      ],
    },
  },

  {
    id: 4,
    title: "Electricity, Water & Gas",
    description: "Reliable Energy · Anytime Access",
    image: "images/services/electricity.jpg",
    link: "/electricity-water-gas",

    demands: [
      "Deemed As Essential Service",
      "Operated As Non-profit Organisation",
      "Reduce The Price Of Electricity To 1/3 Of Its Current Price",
    ],
    demandText:
      "In-line with Russia, China, Venezuela, Turkey and the list continues.",

    references: [
      {
        label: "Cost of Electricity by Country 2025",
        link: "https://worldpopulationreview.com/country-rankings/cost-of-electricity-by-country",
      },
      {
        label: "Electricity price by country 2025 | Statista",
        link: "https://www.statista.com/statistics/263492/electricity-prices-in-selected-countries/",
      },
    ],

    details: {
      intro:
        "Electricity, Gas and Water are essential services that should benefit Australians — not corporations profiting from essential needs.",

      sections: [
        {
          key: "proposal",
          title: "Proposal",
          text: null,
          list: [
            "All electricity generation and transmission should be owned and operated by the Australian Federal Government.",
            "Gas and Water supplies should also be under federal ownership and constitutionally protected from privatisation.",
          ],
        },
        {
          key: "outcome",
          title: null,
          text: "Taking control of energy costs would reduce inflation and make Australian businesses more competitive.",
          list: null,
        },
        {
          key: "challenge",
          title: null,
          text: "Since much of the energy sector is privately owned, Australia must either buy it back or stop corporate profiteering on essential needs.",
          list: null,
        },
      ],
    },
  },

  {
    id: 5,
    title: "Government Accountability",
    description: "Fair Use Of Tax Payers Money.",
    image: "images/services/tax-cut.webp",
    link: "/government-accountability",

    demands: [
      "Manage Australian Tax-payers Money Responsibly And Respectfully",
    ],
    demandText: null,
    references: [],

    details: {
      intro:
        "‘Look after your pennies for your pounds shall look after themselves.’ Governments waste small amounts that snowball into trillions.",

      sections: [
        {
          key: "issues",
          title: "Issues",
          text: null,
          list: [
            "Thousands wasted add up to millions.",
            "Millions wasted add up to hundreds of millions.",
            "Hundreds of millions wasted add up to billions.",
            "Billions wasted become trillions — taxpayers bear the burden.",
          ],
        },
        {
          key: "examples",
          title: "Examples",
          text: null,
          list: [
            "Over $450M wasted on the failed Voice Referendum.",
            "Two new business jets costing taxpayers $450M.",
            "Minister Bill Shorten’s speechwriter costing $620,000 over two years.",
            "$172M spent advertising government policies.",
            "Labor’s $650M spending spree.",
          ],
        },
        {
          key: "misuse",
          title: null,
          text: null,
          list: null,
        },
        {
          key: "message",
          title: null,
          text: "Australia needs good, intelligent economic management.",
          list: null,
        },
      ],
    },
  },

  {
    id: 6,
    title: "Tobacco & Alcohol Taxes",
    description: "Fair Tobacco and Alcohol Tax · Healthier People",
    image: "images/services/tobacco-tax.webp",
    link: "/tobacco-alcohol-taxes",

    demands: [
      "Total Review Of Tobacco And Alcohol Taxes",
      "Price Cigarettes In-line With Our European Friends.",
      "Remove The Financial Incentive That Drives The 'vibrant Multibillion-dollar Black-market Industry'.",
    ],
    demandText: null,

    references: [
      {
        label: "Price Rankings by Country of Cigarettes 20 Pack",
        link: "https://www.numbeo.com/cost-of-living/prices_by_country.jsp?displayCurrency=USD&itemId=17",
      },
      {
        label: "Tobacco Taxes in Australia",
        link: "https://www.tobaccoinaustralia.org.au/chapter-13-taxation/13-6-what-tobacco-taxes-apply-in-australia",
      },
    ],

    details: {
      intro:
        "Excessive taxation on tobacco and alcohol has failed to curb consumption, instead fueling organised crime and black markets.",

      sections: [
        {
          key: "consequences",
          title: "Consequences",
          text: null,
          list: [
            "Creation of a multibillion-dollar tobacco black market controlled by crime syndicates.",
            "Increased violence and arson attacks related to illegal trade.",
            "Punishing law-abiding citizens who drink or smoke responsibly.",
          ],
        },
        {
          key: "conclusion",
          title: null,
          text: "This tax policy is clearly not working, and governments have yet to realise it.",
          list: null,
        },
      ],
    },
  },

  {
    id: 7,
    title: "Immigration",
    description: "Legal Immigration",
    image: "images/services/passport.jpg",
    link: "/immigration",

    demands: [
      "Immediate Stop To Immigration",
      "There Is A Time For Everything – Ecclesiastes 3:1-8 NIV",
    ],
    demandText: null,
    references: [],

    details: {
      intro:
        "Now is not the right time for record immigration when housing and essential services are already under strain.",

      sections: [
        {
          key: "reasoning",
          title: null,
          text: "Even the most basic principle of economics — 'Supply and Demand' — is being ignored by current leadership.",
          list: null,
        },
        {
          key: "impact",
          title: "Impact",
          text: null,
          list: [
            "Increased pressure on housing markets, causing affordability issues for citizens.",
            "Strain on healthcare, education, and public infrastructure.",
            "Potential reduction in quality of services due to overextended resources.",
            "Social tensions arising from resource scarcity and overcrowding.",
          ],
        },
        {
          key: "proposal",
          title: "Proposed Measures",
          text: null,
          list: [
            "Temporarily pause or reduce immigration until current infrastructure meets demand.",
            "Implement policies to prioritise housing and services for current residents.",
            "Review immigration targets annually based on housing and service capacity.",
          ],
        },
      ],
    },
  },
];

function slugify(input: string) {
  if (!input) return "";
  return input
    .toString()
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function stripId(item: any) {
  const { id, ...rest } = item;
  return rest;
}

async function seed() {
  try {
    // Delete existing `services` documents first
    console.log("Fetching existing services IDs...");
    const existingIds: string[] = await client.fetch(
      `
      *[_type == "services"]._id`,
      {},
      { cache: "no-store" }
    );
    if (existingIds.length > 0) {
      console.log(`Deleting ${existingIds.length} existing services...`);
      for (const id of existingIds) {
        try {
          await client.delete(id);
          console.log("Deleted:", id);
        } catch (delErr) {
          console.warn("Failed to delete", id, delErr);
        }
      }
    } else {
      console.log("No existing services found to delete.");
    }

    // Seed new services without `image` field to avoid image-related problems
    for (let i = 0; i < newservicesData.length; i++) {
      const raw = stripId(newservicesData[i]);
      const item = { ...raw } as any;

      // Remove image before sending to Sanity
      if ("image" in item) delete item.image;

      // generate a stable _id using link or title
      const link = (item.link || "").toString();
      const slugSource =
        link.replace(/^\//, "") || item.title || `service-${i}`;
      const docId = `service-${slugify(slugSource)}`;

      const doc = {
        _id: docId,
        _type: "services",
        ...item,
      } as any;

      // Remove potential undefined/null fields that Sanity may not like
      if (doc.demandText === null) delete doc.demandText;
      if (Array.isArray(doc.references) && doc.references.length === 0)
        delete doc.references;

      const result = await client.createOrReplace(doc);
      console.log("Upserted:", result._id);
    }

    console.log("All services seeded successfully (images skipped)");
    process.exit(0);
  } catch (err) {
    console.error("Seeding services failed:", err);
    process.exit(1);
  }
}

seed();
