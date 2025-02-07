import Client1 from "../assets/img/client1.png";
import Client2 from "../assets/img/client2.png";
import Client3 from "../assets/img/client3.png";
import Client4 from "../assets/img/client4.png";
import Client5 from "../assets/img/client5.png";
import Client6 from "../assets/img/client6.png";
import Card1 from "../assets/img/Card1.png";
import Card2 from "../assets/img/Card2.png";
import Card3 from "../assets/img/Card3.png";
const ReviewsData = [
  {
    id: 1,
    name: "John Doe",
    image: Client1,
    company: "CEO Sans Brothers",
    review:
      "It was a pleasure working with the Coca team. They understood the brief correctly and delivered great designs exceeding the expectations.",
  },
  {
    id: 2,
    name: "Eleanor Pena",
    image: Client2,
    company: "CEO Sans Brothers",
    review:
      "It was a pleasure working with the Coca team. They understood the brief correctly and delivered great designs exceeding the expectations.",
  },
  {
    id: 3,
    name: "Zhafira Azalea",
    image: Client3,
    company: "CEO Sans Brothers",
    review:
      "It was a pleasure working with the Coca team. They understood the brief correctly and delivered great designs exceeding the expectations.",
  },
  {
    id: 4,
    name: "Ronald Richards",
    image: Client4,
    company: "CEO Sans Brothers",
    review:
      "It was a pleasure working with the Coca team. They understood the brief correctly and delivered great designs exceeding the expectations.",
  },
  {
    id: 5,
    name: "Rakabuming Suhu",
    image: Client5,
    company: "CEO Sans Brothers",
    review:
      "It was a pleasure working with the Coca team. They understood the brief correctly and delivered great designs exceeding the expectations.",
  },
  {
    id: 6,
    name: "Jerome Bell",
    image: Client6,
    company: "CEO Sans Brothers",
    review:
      "It was a pleasure working with the Coca team. They understood the brief correctly and delivered great designs exceeding the expectations.",
  },
  {
    id: 7,
    name: "Savannah Nguyen",
    image: Client1,
    company: "CEO Sans Brothers",
    review:
      "It was a pleasure working with the Coca team. They understood the brief correctly and delivered great designs exceeding the expectations.",
  },
  {
    id: 8,
    name: "Zhafira Azalea",
    image: Client2,
    company: "CEO Sans Brothers",
    review:
      "It was a pleasure working with the Coca team. They understood the brief correctly and delivered great designs exceeding the expectations.",
  },
];
const courses = [
  {
    id: 1,
    image: Card1,
    title: "5 Minute Bitcoin, Course 3, Advanced",
    description:
      "Learn about bitcoin and start earning from it. This course will help you a lot.",
  },
  {
    id: 2,
    image: Card2,
    title: "5 Minute Bitcoin, Course 2, Intermediate",
    description:
      "Learn about bitcoin and start earning from it. This course will help you a lot.",
  },
  {
    id: 3,
    image: Card3,
    title: "5 Minute Bitcoin, Course 1, Beginner",
    description:
      "Learn about bitcoin and start earning from it. This course will help you a lot.",
  },
];

const faqs = [
  {
    id: 1,
    question: "1. Lorem Ipsum Dolor Sit Amet?",
    answer:
      "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution",
  },
  {
    id: 2,
    question: "2. Lorem Ipsusm Doler Sumit?",
    answer:
      "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.",
  },
  {
    id: 3,
    question: "3. Lorem Ipsum Dolor Sit Amet?",
    answer:
      "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution",
  },
  {
    id: 4,
    question: "4. Lorem Ipsum Dolor Sit Amet?",
    answer:
      "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution",
  },
  {
    id: 5,
    question: "Lorem Ipsusm Doler Sumit?",
    answer:
      "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti.",
  },
];

const quizes = [
  {
    id: 1,
    queation: "1 Introduction",
    answer:
      "As we discussed in Course 2, Bitcoin’s network itself has never been hacked, and the idea of “hacking” the Bitcoin network is actually impossible, given that it’s all in the public domain anyway.But individual wallets and exchanges are vulnerable to theft. Most hacks occur due to poor security practices, like weak passwords or phishing scams. Using a secure wallet and enabling 2FA greatly reduces these risks. Cold storage offers the highest level of protection.If you’re going to be buying and selling Bitcoin, it’s vital you understand best Bitcoin practice, especially when it comes to storing your assets.",
    completed: false,
  },
  {
    id: 2,
    queation:
      "2 Ok, I get that, but aren’t there thousands of these crypto currencies – why is Bitcoin so special?  ",
    answer:
      "There are two key reasons: Its specific qualities: Bitcoin has unique attributes, such as its limited supply of 21 million, that many other cryptocurrencies don’t share. We’ll explore these qualities in more detail later.First-mover status: Bitcoin was the first digital asset to solve the problem of digital scarcity.Bitcoin became the first digital asset that can’t be copied and pasted. Before Bitcoin, anything digital—files, images, text—could be easily duplicated, making it impossible to establish true ownership or scarcity. Bitcoin solved this problem by introducing digital scarcity, where each Bitcoin is unique and cannot be duplicated. As the first cryptocurrency, Bitcoin gained a head start in adoption and trust. Since 2009, it has become the most widely recognized and used digital asset, with the largest user base, transaction volume, and market capitalization. This early advantage created a network effect, where Bitcoin’s adoption has driven further participation, reinforcing its dominance and trustworthiness.Bitcoin has become the most trusted and dominant player in the digital asset space, simply because people have faith that it is the most trusted and dominant player in the digital asset space.  That might sound crazy, but it’s no different to why fiat currencies have value to people – because they simply have faith in the government and its ability to manage the currency and pay its debts.",
    completed: false,
  },
  {
    id: 3,
    queation: "3 And Bitcoin is the most popular?",
    answer:
      "Yes, Bitcoin is the most popular digital asset. As of November 2024, it holds the largest market capitalisation among digital assets, surpassing $1.9 trillion. In comparison, Ethereum, the second-largest digital asset, has a market capitalization of approximately $375 billion. While exact user numbers are challenging to determine, Bitcoin's user base is estimated to be over 106 million individuals globally, significantly higher than Ethereum's user base. This widespread adoption and trust solidify Bitcoin's position as the gold standard in the digital asset world.",
    completed: false,
  },
  {
    id: 4,
    queation:
      "4 But you can’t touch it – there’s no underlying value to Bitcoin, surely?",
    answer:
      "Bitcoin provides real value by solving problems for its holders, which is why individuals, businesses, and institutions continue to buy and hold it. While Bitcoin isn’t physical, neither are many of the most transformative technologies we use today—think of the internet, email, or AI. These aren’t tangible, yet they undeniably provide value and solve critical problems.Some people compare Bitcoin to Tulipmania in 17th-century Holland.  But tulips were a speculative bubble around something with no lasting utility—just decorative flowers. Bitcoin, by contrast, is a technological and financial innovation that provides solutions like scarcity, decentralisation, and censorship resistance, giving it utility and real-world value.",
    completed: false,
  },
  {
    id: 5,
    queation: "5 True, but nobody’s suggesting I invest in “the internet”…?",
    answer:
      "That’s because the internet, while transformative, didn’t create scarcity. Everything digital—until Bitcoin—could be copied and shared endlessly. Bitcoin introduced something entirely new: digital scarcity, where ownership is provable, and assets can’t be duplicated. Bitcoin isn’t just another piece of digital technology—it’s a financial system built on scarcity, trust, and decentralization, creating a new way of seeing and using the digital world. It’s not just a currency; it’s a shift in how we think about ownership and value in the digital age.",
    completed: false,
  },
];

export { ReviewsData, courses, faqs };
