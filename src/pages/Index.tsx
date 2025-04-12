import React, { useState } from "react";
import { generateStory } from "../services/storyService";
import StoryForm from "../components/StoryForm";
import StoryDisplay from "../components/StoryDisplay";
import LoadingSpinner from "../components/LoadingSpinner";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { ArrowUp, Linkedin } from "lucide-react";

const Index = () => {
  const [story, setStory] = useState<{
    title: string;
    content: string;
    takeaway: string;
  } | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [prevTopic, setPrevTopic] = useState<string | null>(null);

  const handleSubmitTopic = async (topic: string) => {
    setIsLoading(true);
    setPrevTopic(topic);
    try {
      const generatedStory = await generateStory(topic);
      setStory(generatedStory);
      toast.success("Story created successfully!");
    } catch (error) {
      console.error("Error generating story:", error);
      toast.error("Failed to create story. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 py-12">
      <div className="container mx-auto px-4">
        <header className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-4 border-b-2 border-purple-600 pb-2 inline-block">
            Story Tales Teach
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg leading-relaxed">
            Explore concepts through engaging Hinglish narratives. Enter a topic to experience learning enriched by storytelling.
          </p>
        </header>

        <div className="flex flex-col items-center justify-center">
          <StoryForm onSubmit={handleSubmitTopic} isLoading={isLoading} />

          {isLoading && (
            <div className="mt-8">
              <LoadingSpinner />
              <p className="mt-2 text-center text-gray-500">
                Generating your story about {prevTopic}...
              </p>
            </div>
          )}

          <div className="w-full max-w-3xl mt-10">
            <StoryDisplay story={story} />
          </div>

          {story && (
            <div className="mt-8 mb-16">
              <Button
                onClick={() =>
                  window.scrollTo({
                    top: 0,
                    behavior: "smooth",
                  })
                }
                className="flex items-center bg-purple-600 hover:bg-purple-700 text-white transition-colors duration-300 rounded-lg px-6 py-2"
              >
                <ArrowUp className="mr-2 h-5 w-5" />
                Explore New Topics
              </Button>
            </div>
          )}

          {/* LinkedIn Profile Section */}
          <div className="mt-12 w-full max-w-2xl bg-white p-6 rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-all duration-300">
            <div className="flex items-center space-x-4">
              <Linkedin className="w-8 h-8 text-purple-600" />
              <div>
                <h3 className="text-lg font-semibold text-gray-800">
                  About the Creator
                </h3>
                <p className="text-gray-600 mt-1">
                  This platform was developed by Arshad ali Bhorania, an educator and innovator passionate about integrating storytelling with learning.
                </p>
                <a
                  href="https://www.linkedin.com/in/arshad-ali-bhorania/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-block text-purple-600 hover:text-purple-800 transition-colors"
                >
                  View LinkedIn Profile
                </a>
              </div>
            </div>
          </div>
        </div>

        <footer className="mt-16 text-center text-gray-500">
          <p className="text-base">
            © 2025 Story Tales Teach - Enhancing education through Hinglish storytelling
          </p>
          <p className="mt-2 flex items-center justify-center text-sm">
            Created by{" "}
            <strong className="text-purple-600 ml-1">Arshad ali Bhorania</strong>
            <a
              href="https://www.linkedin.com/in/arshad-ali-bhorania/"
              target="_blank"
              rel="noopener noreferrer"
              className="ml-2 text-purple-600 hover:text-purple-800 transition-colors"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 6.163 2.582 6.163 5.838 0 3.255-2.959 5.837-6.163 5.837-3.204 0-6.163-2.582-6.163-5.837 0-3.256 2.959-5.838 6.163-5.838zm0-1.163c-4.429 0-8 3.571-8 8 0 4.429 3.571 8 8 8s8-3.571 8-8c0-4.429-3.571-8-8-8zm4.571 10.286l-4.571 2.857-4.571-2.857 1.143-1.714 3.429 2.143 3.429-2.143 1.143 1.714z"/>
              </svg>
            </a>
          </p>
        </footer>
      </div>
    </div>
  );
};

export default Index;