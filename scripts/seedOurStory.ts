import dotenv from 'dotenv';
import client from '../src/config/sanity.js';

dotenv.config();

const sections = [
    {
        title: "WHO ARE FRIENDS UNITED?",
        content: [
            "Infuriated Australians who believe that the country has strayed from its golden era, when:",
        ],
        points: [
            "owning your own home was a reality for all,",
            "cost of living was manageable and did not create impoverishment,",
            "enjoying a cigarette or a drink didn’t break the budget,",
            "the streets were safe, and",
            "personal freedoms were so much less restricted.",
        ],
        ending:
            "Friends United are ordinary Australian citizens passionate about restoring Australia to its former glory — being once again the ‘Lucky Country’ and the ‘Envy of the World’.",
    },
    {
        title: "WHAT DOES FRIENDS UNITED WANT TO ACCOMPLISH?",
        content: [
            "To form a political union of over 1 million voters that emphasises ‘Strength in Numbers’ — a mass movement that speaks with ‘One Super Powerful Voice’ to ‘Pressure Political Leaders’ to act on major key issues like:",
        ],
        points: [
            "Cost of Living,",
            "Housing Affordability,",
            "Cost of Electricity,",
            "Cigarette and Alcohol Taxes,",
            "Illicit Drugs,",
            "Immigration, and",
            "Government Accountability.",
        ],
    },
    {
        title: "WHAT HAPPENS IF POLITICIANS DON’T LISTEN?",
        content: [
            "Friends United will mobilise its members to remove the useless politicians from office and replace them with competent, enthusiastic leaders come the next election.",
        ],
    },
    {
        title: "WHY FORM THIS UNION?",
        content: [
            "Australian voters have lost faith in our political leadership:",
        ],
        points: [
            "The 2025 Federal Election cited an increase in ‘donkey and informal’ votes,",
            "Approximately 1 million votes were deemed informal — marking a missed opportunity for change,",
            "Our political leadership is not listening to the needs of the electorate, enforcing their own agendas upon the Australian people.",
        ],
        ending: "However, a united front cannot be ignored.",
    },
    {
        title: "WHY JOIN FRIENDS UNITED AND BECOME A VOICE?",
        content: [
            "For Australia to become the ‘lucky country’ once again, we require leadership that:",
        ],
        points: [
            "Prioritises Australia and its citizens at the forefront, and",
            "Ensures voters identify politicians who have those qualities.",
        ],
        subTitle: "Friends United team will:",
        subPoints: [
            "Separate political parties and their members like ‘Wheat from the Chaff’.",
            "Make known our demands to all registered political parties and their members.",
            "Evaluate their responses, views and stance on all the issues raised.",
            "Evaluate their actions, and",
            "Provide regular updates to all Friends United members.",
        ],
    },
    {
        title: "FRIENDS UNITED strength lies in the numbers",
        content: [
            "As our members grow, so does our collective voice and influence.",
        ],
    },
];

async function seedOurStory() {
    try {
        await client.create({
            _type: 'ourstory',
            sections,
        });
        console.log('Our Story seeded successfully!');
    } catch (error) {
        console.error('Error seeding Our Story:', error);
    }
}

seedOurStory();
