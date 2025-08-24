export type Destination = {
  id: number;
  name: string;
  slug: string;
  shortDescription: string;
  longDescription: string;
  images: string[];
  aiHint: string;
  tours: { name: string; description: string }[];
  activities: { name:string; description: string }[];
};

export const destinations: Destination[] = [
  {
    id: 1,
    name: "Tokyo, Japan",
    slug: "tokyo-japan",
    shortDescription: "A vibrant metropolis where ancient tradition meets futuristic technology.",
    longDescription: "Tokyo, Japan's bustling capital, mixes the ultramodern and the traditional, from neon-lit skyscrapers to historic temples. The opulent Meiji Shinto Shrine is known for its towering gate and surrounding woods. The Imperial Palace sits amid large public gardens. The city's many museums offer exhibits ranging from classical art (in the Tokyo National Museum) to a reconstructed kabuki theater.",
    images: [
      "https://images.unsplash.com/photo-1542051841857-5f90071e7989?q=80&w=1200&h=800&fit=crop",
      "https://images.unsplash.com/photo-1513407030348-c983a97b98d8?q=80&w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1536098561742-ca998e48cbcc?q=80&w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?q=80&w=600&h=400&fit=crop",
    ],
    aiHint: "tokyo street",
    tours: [
      { name: "Tokyo Skytree & Asakusa Tour", description: "Experience the blend of modern and traditional Tokyo." },
      { name: "Mount Fuji & Hakone Day Trip", description: "Witness the majestic beauty of Japan's most famous mountain." },
    ],
    activities: [
        { name: "Shibuya Crossing Experience", description: "Immerse yourself in the world's busiest intersection." },
        { name: "Tsukiji Fish Market Visit", description: "Explore the bustling market and enjoy fresh sushi." },
    ],
  },
  {
    id: 2,
    name: "Paris, France",
    slug: "paris-france",
    shortDescription: "The romantic capital of France, famed for its art, fashion, and culture.",
    longDescription: "Paris, France's capital, is a major European city and a global center for art, fashion, gastronomy and culture. Its 19th-century cityscape is crisscrossed by wide boulevards and the River Seine. Beyond such landmarks as the Eiffel Tower and the 12th-century, Gothic Notre-Dame cathedral, the city is known for its cafe culture and designer boutiques along the Rue du Faubourg Saint-Honoré.",
    images: [
      "https://images.unsplash.com/photo-1522093007474-d86e9bf7ba6f?q=80&w=1200&h=800&fit=crop",
      "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?q=80&w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1502602898657-3e91760c0337?q=80&w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1550345332-09e3ac987658?q=80&w=600&h=400&fit=crop",
    ],
    aiHint: "paris eiffel",
    tours: [
      { name: "Eiffel Tower Summit Tour", description: "Get panoramic views of Paris from the top of the iconic tower." },
      { name: "Louvre Museum Guided Tour", description: "Discover masterpieces like the Mona Lisa with an expert guide." },
    ],
    activities: [
        { name: "Seine River Cruise", description: "Enjoy a romantic cruise along the Seine." },
        { name: "Montmartre Walking Tour", description: "Explore the artistic heart of Paris." },
    ],
  },
  {
    id: 3,
    name: "Bali, Indonesia",
    slug: "bali-indonesia",
    shortDescription: "An Indonesian paradise known for its forested volcanic mountains and beaches.",
    longDescription: "Bali is an Indonesian island known for its forested volcanic mountains, iconic rice paddies, beaches and coral reefs. The island is home to religious sites such as cliffside Uluwatu Temple. To the south, the beachside city of Kuta has lively bars, while Seminyak, Sanur and Nusa Dua are popular resort towns. The island is also known for its yoga and meditation retreats.",
    images: [
      "https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=1200&h=800&fit=crop",
      "https://images.unsplash.com/photo-1573900206103-670354de4161?q=80&w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1546484453-37e20934f464?q=80&w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1546484453-37e20934f464?q=80&w=600&h=400&fit=crop",
    ],
    aiHint: "bali temple",
    tours: [
      { name: "Ubud Monkey Forest & Rice Terraces", description: "Explore the lush landscapes and cultural heart of Bali." },
      { name: "Mount Batur Sunrise Trek", description: "Hike an active volcano for breathtaking sunrise views." },
    ],
    activities: [
        { name: "Surfing in Kuta", description: "Catch some waves on Bali's most famous beach." },
        { name: "Balinese Cooking Class", description: "Learn the secrets of traditional Balinese cuisine." },
    ],
  },
   {
    id: 4,
    name: "Rome, Italy",
    slug: "rome-italy",
    shortDescription: "The Eternal City, with a rich history spanning over two and a half thousand years.",
    longDescription: "Rome, Italy’s capital, is a sprawling, cosmopolitan city with nearly 3,000 years of globally influential art, architecture and culture on display. Ancient ruins such as the Forum and the Colosseum evoke the power of the former Roman Empire. Vatican City, headquarters of the Roman Catholic Church, has St. Peter’s Basilica and the Vatican Museums, which house masterpieces such as Michelangelo’s Sistine Chapel frescoes.",
    images: [
      "https://images.unsplash.com/photo-1552832230-c0197dd311b5?q=80&w=1200&h=800&fit=crop",
      "https://images.unsplash.com/photo-1542338106-2155a4ca763d?q=80&w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1529181143821-8243257185b1?q=80&w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1515542622106-78bda8ba0e5b?q=80&w=600&h=400&fit=crop",
    ],
    aiHint: "rome colosseum",
    tours: [
      { name: "Colosseum, Roman Forum & Palatine Hill Tour", description: "Skip the line and explore the heart of Ancient Rome." },
      { name: "Vatican City Complete Tour", description: "Visit the Vatican Museums, Sistine Chapel, and St. Peter's Basilica." },
    ],
    activities: [
        { name: "Pasta Making Class", description: "Learn to make authentic Italian pasta from a local chef." },
        { name: "Toss a coin in Trevi Fountain", description: "Participate in the age-old tradition to ensure your return to Rome." },
    ],
  },
];
