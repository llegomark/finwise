import { AnimatePresence, motion } from "framer-motion";
import type { NextPage } from "next";
import Head from "next/head";
import { useRef, useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import Footer from "../components/Footer";
import Header from "../components/Header";
import ResizablePanel from "../components/ResizablePanel";
import Balancer from "react-wrap-balancer";
import React from "react";
import SocialIcon from "../components/SocialIcon";
import UsageGuidelines from "../components/UsageGuidelines";

// This defines the types of data that the API response should have
interface ResponseType {
  status: number;
  body: string;
  headers: {
    "X-Ratelimit-Limit": string;
    "X-Ratelimit-Remaining": string;
    "X-Ratelimit-Reset": string;
  };
}

// This extends the ResponseType interface to include an optional error message
interface ApiResponse extends ResponseType {
  error?: string;
}

// This defines the Home component, which is a functional component with no props
const Home: NextPage = () => {
  // These states store the component's data and whether it is currently loading
  const [, setResponse] = useState<ResponseType | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [topic, setTopic] = useState<string>("");
  const [generatedTopics, setGeneratedTopics] = useState<string>("");

  const finguidanceRef = useRef<null | HTMLDivElement>(null);

  const scrollToFinguidance = () => {
    if (finguidanceRef.current !== null) {
      finguidanceRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const prompt = `${topic}`;

  // Define an asynchronous function that sends a POST request to an API route and displays the response
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    generateTopic().catch((error) => {
      // Handle errors here
      console.error(error);
      alert("An error occurred. Please try again.");
    });
  };

  const generateTopic = async (): Promise<void> => {
    setGeneratedTopics(""); // Clear any previous generated topics
    setLoading(true); // Set the loading state to true

    // Send a POST request to the API route with the prompt in the request body
    const response = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt,
      }),
    });

    // Handle errors when the response status is outside the 200-299 range
    if (response.status < 200 || response.status >= 300) {
      // Construct an error object with details about the response
      const error: ApiResponse = {
        status: response.status,
        body: await response.text(),
        headers: {
          "X-Ratelimit-Limit": response.headers.get(
            "X-Ratelimit-Limit"
          ) as string,
          "X-Ratelimit-Remaining": response.headers.get(
            "X-Ratelimit-Remaining"
          ) as string,
          "X-Ratelimit-Reset": response.headers.get(
            "X-Ratelimit-Reset"
          ) as string,
        },
        error: `Request failed with status code ${response.status}`,
      };

      // Set the response state to the error and show an alert to the user
      setResponse(error);
      setLoading(false);
      alert(
        `You have no API requests remaining today. Try again after 24 hours.`
      );
      return;
    }

    // Read the response body as a stream and update the generated topics state with each chunk of data
    const data = response.body;
    if (!data) {
      return;
    }

    const reader = data.getReader();
    const decoder = new TextDecoder();
    let done = false;

    while (!done) {
      const { value, done: doneReading } = await reader.read();
      done = doneReading;
      const chunkValue = decoder.decode(value);
      setGeneratedTopics((prev) => prev + chunkValue);
    }
    scrollToFinguidance(); // Scroll to the generated passage
    setLoading(false); // Set the loading state to false once the response is fully received
  };

  // This function limits the number of characters in a text area input
  const limitCharacters = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
    const maxCharacters = 400; // Set the maximum number of characters allowed
    const currentCharacters = e.target.value.length; // Get the current number of characters

    // Check if the current number of characters exceeds the maximum
    if (currentCharacters > maxCharacters) {
      // If it does, truncate the input value to the maximum number of characters
      e.target.value = e.target.value.slice(0, maxCharacters);
      // Show an error message to the user using a toast notification
      toast.error("You have reached the maximum number of characters.");
    }
  };

  // This line splits a string into an array of strings, with each element representing a line in the original string
  const lines: string[] = generatedTopics.split("\n");

  return (
    <div className="mx-auto flex min-h-screen max-w-5xl flex-col items-center justify-center py-2">
      <Head>
        <title>
          Get AI-Powered Guidance on Debt and Financial Management Today -
          FinWise
        </title>
      </Head>

      <Header href="/" />
      <main className="sm:mt-15 mt-12 flex flex-1 flex-col items-center justify-center px-4 text-center">
        <a
          className="mb-10 flex max-w-fit items-center justify-center space-x-2 rounded-full border border-gray-300 bg-neutral-50 px-4 py-2 text-sm text-slate-900 shadow-md transition-colors hover:bg-gray-100"
          href="/github"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Visit Mark Anthony Llego's Github profile"
          aria-describedby="github-link"
        >
          <SocialIcon platform="github" size={25} />
          <p>Star on Github</p>
        </a>
        <h2 className="mx-auto max-w-4xl text-5xl font-bold tracking-normal text-slate-900 sm:text-6xl md:text-7xl">
          <Balancer>
            Get AI-Powered Guidance on Debt and Financial Management Today
          </Balancer>
        </h2>
        <p
          className="mx-auto mt-6 max-w-xl text-base leading-normal text-slate-900 sm:mt-12 sm:text-lg lg:text-lg"
          aria-label="Reading Passages"
        >
          <Balancer>
            Say goodbye to financial stress and take control of your money with
            our AI-powered guidance. Whether you&apos;re struggling with debt or
            looking to improve your overall financial health, our platform
            provides personalized advice to help you achieve your goals.
          </Balancer>
        </p>
        <div className="w-full max-w-xl px-6">
          <div className="align-items-center mt-10 flex items-center">
            <span className="leading-zero flex h-6 w-6 items-center justify-center rounded-full bg-black p-2 text-center text-white">
              1
            </span>
            <p className="ml-3 text-left text-base leading-normal text-slate-900 sm:text-lg lg:text-lg">
              <Balancer>
                Tell us about your financial concerns or questions.
              </Balancer>
            </p>
          </div>
          <form onSubmit={handleSubmit}>
            <textarea
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              onInput={limitCharacters}
              rows={4}
              className="focus:shadow-outline mt-5 w-full rounded-lg bg-neutral-50 shadow-sm focus:outline-none"
              placeholder={
                "Are you facing challenges with debt repayment due to unfair debt collection practices by financing and lending companies? Are you trying to save for a big purchase while also managing your debt? Or are you simply seeking general financial advice? Our AI-powered platform is here to assist you. Describe your financial situation and objectives, and our technology will provide customized guidance specifically designed to meet your individual needs, including addressing unfair debt collection practices by financing and lending companies."
              }
              aria-label="Enter a theme, subject matter, or content focus. (Leave blank to generate a random passage.)"
            />
            <p className="mb-1 text-right text-sm text-gray-500">
              {topic.length}/400
            </p>
            {!loading && (
              <button
                className="w-full rounded-lg bg-black px-4 py-2 text-base font-bold text-white transition-colors hover:bg-black/80"
                type="submit"
                disabled={topic === ""}
              >
                Get Financial Guidance &rarr;
              </button>
            )}
            {loading && (
              <button
                className="w-full rounded-lg bg-black px-4 py-2 text-base font-bold text-white"
                disabled
              >
                Typing...
              </button>
            )}
          </form>
        </div>
        <Toaster
          position="bottom-right"
          reverseOrder={false}
          toastOptions={{ duration: 2000 }}
        />
        <hr className="border-1 h-px bg-gray-700 dark:bg-gray-700" />
        <ResizablePanel>
          <AnimatePresence mode="wait">
            <motion.div className="my-10 space-y-10">
              {generatedTopics && (
                <>
                  <div>
                    <h2 className="mx-auto max-w-4xl px-3 text-2xl font-bold text-slate-900 md:text-3xl lg:text-4xl">
                      <Balancer>Financial Guidance</Balancer>
                    </h2>
                  </div>
                  <div className="mx-auto flex max-w-xl flex-col items-center justify-center space-y-8 px-3">
                    <div
                      className="relative transform cursor-pointer rounded-xl border bg-sky-200 p-4 shadow-md transition-all duration-300 ease-in-out hover:-translate-y-1 hover:bg-sky-100 hover:shadow-lg"
                      onClick={() => {
                        const financialguidance = `${generatedTopics}`;
                        navigator.clipboard
                          .writeText(financialguidance)
                          .then(() => {
                            toast.success(
                              "AI-Powered Financial Guidance Copied",
                              {}
                            );
                          })
                          .catch((error) => {
                            console.error(error);
                          });
                      }}
                    >
                      <p
                        className="text-start text-base leading-normal text-slate-900 sm:text-lg lg:text-lg"
                        ref={finguidanceRef}
                      >
                        {lines.map((line, index) => (
                          <React.Fragment key={index}>
                            {index === 0 ? line : line}
                            <br />
                          </React.Fragment>
                        ))}
                        <br />
                        <span className="font-bold">Hint: </span>
                        <span>
                          Ready to copy the AI-Powered Financial Advice? Click
                          on the box to copy it to your clipboard.
                        </span>
                      </p>
                    </div>
                    <UsageGuidelines />
                  </div>
                </>
              )}
            </motion.div>
          </AnimatePresence>
        </ResizablePanel>
      </main>
      <Footer />
    </div>
  );
};

export default Home;
