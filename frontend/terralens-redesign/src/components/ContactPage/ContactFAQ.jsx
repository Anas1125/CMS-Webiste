import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Minus, Plus } from "lucide-react";

const faqs = [
  {
    question: "What services does TerraLens provide?",
    answer:
      "We specialize in GIS, Remote Sensing, Enterprise Software Development, Artificial Intelligence, IoT Solutions, Cloud Platforms and Technology Consulting.",
  },
  {
    question: "How quickly will I receive a response?",
    answer:
      "Our team aims to respond to all inquiries within one business day. More complex project discussions may require additional follow-up.",
  },
  {
    question: "Do you work with international clients?",
    answer:
      "Yes. TerraLens works with government organizations, enterprises and businesses both within India and internationally.",
  },
  {
    question: "Can I request a project consultation?",
    answer:
      "Absolutely. You can use the contact form to tell us about your requirements, and our team will schedule a consultation to discuss your project.",
  },
];

export default function ContactFAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section
      style={{
        backgroundColor: "#ffffff",
        padding: "96px 0px",
        width: "100%",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "64rem",
          margin: "0 auto",
          padding: "0 24px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          boxSizing: "border-box",
        }}
      >

        {/* Header */}
        <div
          style={{
            textAlign: "center",
            marginBottom: "64px",
            maxWidth: "42rem",
          }}
        >
          <p
            style={{
              textTransform: "uppercase",
              letterSpacing: "5px",
              color: "#0ea5e9",
              fontSize: "0.75rem",
              fontWeight: "700",
              marginBottom: "12px",
            }}
          >
            FAQ
          </p>

          <h2
            style={{
              fontSize: "clamp(2rem, 3vw, 2.75rem)",
              fontWeight: "800",
              color: "#0f172a",
              letterSpacing: "-0.025em",
              marginBottom: "16px",
              lineHeight: "1.2",
            }}
          >
            Frequently Asked Questions
          </h2>

          <p
            style={{
              fontSize: "1rem",
              color: "#64748b",
              lineHeight: "1.6",
            }}
          >
            Here are answers to some of the most common
            questions about our services and how we work.
          </p>
        </div>

        {/* Accordion Container */}
        <div
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            gap: "20px",
            boxSizing: "border-box",
          }}
        >
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={faq.question}
                style={{
                  borderRadius: "24px",
                  border: "1px solid #e2e8f0",
                  backgroundColor: "#ffffff",
                  overflow: "hidden",
                  boxSizing: "border-box",
                  transition: "border-color 0.3s ease",
                  boxShadow:
                    "0 8px 30px rgba(15,23,42,0.04)",
                }}
                className="hover:border-sky-300"
              >
                <button
                  onClick={() =>
                    setOpenIndex(isOpen ? -1 : index)
                  }
                  style={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "24px 32px",
                    textAlign: "left",
                    background: "transparent",
                    border: "none",
                    cursor: "pointer",
                    boxSizing: "border-box",
                  }}
                >
                  <h3
                    style={{
                      fontSize: "1.25rem",
                      fontWeight: "600",
                      color: "#0f172a",
                      flex: 1,
                      paddingRight: "16px",
                    }}
                  >
                    {faq.question}
                  </h3>

                  <div style={{ flexShrink: 0 }}>
                    {isOpen ? (
                      <Minus
                        className="text-sky-500"
                        size={20}
                      />
                    ) : (
                      <Plus
                        className="text-slate-400"
                        size={20}
                      />
                    )}
                  </div>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{
                        height: 0,
                        opacity: 0,
                      }}
                      animate={{
                        height: "auto",
                        opacity: 1,
                      }}
                      exit={{
                        height: 0,
                        opacity: 0,
                      }}
                      transition={{
                        duration: 0.3,
                      }}
                    >
                      <p
                        style={{
                          padding: "0 32px 28px 32px",
                          color: "#64748b",
                          fontSize: "1rem",
                          lineHeight: "1.7",
                          boxSizing: "border-box",
                        }}
                      >
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}