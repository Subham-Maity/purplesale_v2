import { useState } from "react";
import { motion } from "framer-motion";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";

const questionsAndAnswers = [
  {
    question: "What is KYC?",
    answer:
      "Know Your Customer (KYC) is a process whereby the project owner has shared their identification documents with PinkSale. KYC is used as a deterrent method to reduce illicit and deceptive behaviour.More information about KYC can be found on the Binance Academy website",
  },
  {
    question: "What is an Audit?",
    answer:
      "The Audit badge details that the smart contract has been tested and analysed by a 3rd party service.Information about security audits can be seen via the Binance",
  },
  {
    question: "What is SAFU?",
    answer:
      "The SAFU badge demonstrates that the contract has been created by a PinkSale verified partner. ",
  },
  {
    question: "What is Doxx?",
    answer:
      "Projects certified with the Doxx badge highlights that the projects owner has completed a video AMA within their community, and that their submission to PinkSale matches their KYC information.More information on PinkSale Doxx badge can be seen explained in ",
  },
  {
    question: "What is DYOR?",
    answer:
      "DYOR aims to reduce the number of uninformed investors in cryptocurrency. It encourages them to research and understand a cryptocurrency before investing so that they can answer precisely why they are buying that currency and supporting that project. The term is also often used as a disclaimer when cryptocurrency traders and enthusiasts make public posts or share their market analyses on social media platforms.",
  },
];

const Faq = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    if (activeIndex === index) {
      setActiveIndex(null);
    } else {
      setActiveIndex(index);
    }
  };

  return (
    <div className="mt-4 flex justify-left mb-4 items-center">
      <div className="w-[370px] lg:w-[640px] md:w-[368px] dark:bg-[#242525] bg-stone-50 rounded-md p-6 ">
        <div id="accordion-open" data-accordion="open">
          {questionsAndAnswers.map((qa, index) => (
            <div key={index}>
              <h2 id={`accordion-open-heading-${index + 1}`}>
                <button
                  type="button"
                  className="flex items-center justify-between w-full p-5 font-medium text-left text-gray-500 border border-b-0 border-gray-200 rounded-t-xl focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
                  onClick={() => toggleAccordion(index)}
                  aria-expanded={activeIndex === index}
                  aria-controls={`accordion-open-body-${index + 1}`}
                >
                  <span className="flex items-center">
                    {qa.question}{" "}
                    {activeIndex === index ? (
                      <FaAngleUp className="w-3 h-3" />
                    ) : (
                      <FaAngleDown className="w-3 h-3" />
                    )}
                  </span>
                </button>
              </h2>
              <motion.div
                initial="closed"
                animate={activeIndex === index ? "open" : "closed"}
                variants={{
                  open: { opacity: 1, height: "auto" },
                  closed: { opacity: 0, height: 0 },
                }}
                id={`accordion-open-body-${index + 1}`}
                className="overflow-hidden"
                aria-labelledby={`accordion-open-heading-${index + 1}`}
              >
                <div className="p-5 border border-b-0 border-gray-200 dark:border-gray-700 dark:bg-stone-900">
                  <p className="mb-2 text-gray-500 dark:text-gray-400">
                    {qa.answer}
                  </p>
                </div>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Faq;
