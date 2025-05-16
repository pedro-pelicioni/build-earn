"use client"
import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Clock, FileText } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { JobDetailModal } from "@/components/job-detail-modal"

// Define job type for better type safety
type JobCategory = "Content" | "Design" | "Development" | "Other"

type Job = {
  id: number
  company: string
  logo: string
  bgColor: string
  title: string
  category: JobCategory
  type: "Bounty" | "Project" | "Grant"
  dueIn: number
  applications: number
  amount: number
  amountUsd: number
  description?: string
  status: "Open" | "In Review" | "Completed"
}

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [activeFilter, setActiveFilter] = useState<"All" | JobCategory>("All")
  const [activeStatusFilter, setActiveStatusFilter] = useState<"Open" | "In Review" | "Completed" | "All">("Open")
  const [selectedJob, setSelectedJob] = useState<Job | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const totalSlides = 2

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === totalSlides - 1 ? 0 : prev + 1))
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? totalSlides - 1 : prev - 1))
  }

  const goToSlide = (slideIndex) => {
    setCurrentSlide(slideIndex)
  }

  const openJobDetail = (job: Job) => {
    setSelectedJob(job)
    setIsModalOpen(true)
  }

  const closeJobDetail = () => {
    setIsModalOpen(false)
  }

  // Auto-advance slides
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide()
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  // Job listings data
  const jobs: Job[] = [
    {
      id: 1,
      company: "Blend Finance",
      logo: "/blend-logo.png",
      bgColor: "bg-green-500",
      title: "Create a tutorial for Blend Finance's new lending protocol",
      category: "Content",
      type: "Bounty",
      dueIn: 3,
      applications: 12,
      amount: 5000,
      amountUsd: 1500,
      description:
        "Write a comprehensive tutorial explaining how to use Blend Finance's new lending protocol, including step-by-step instructions for borrowing, lending, and managing positions.",
      status: "Open",
    },
    {
      id: 2,
      company: "Soroswap",
      logo: "/soroswap-logo.png",
      bgColor: "bg-black",
      title: "Design a new UI for Soroswap's liquidity pools dashboard",
      category: "Design",
      type: "Bounty",
      dueIn: 5,
      applications: 24,
      amount: 8000,
      amountUsd: 2400,
      description:
        "Create a modern, intuitive UI design for Soroswap's liquidity pools dashboard that improves user experience and makes complex DeFi concepts more accessible to users.",
      status: "In Review",
    },
    {
      id: 3,
      company: "Lumenswap",
      logo: "/lumenswap-logo.png",
      bgColor: "bg-black",
      title: "Develop a trading bot for Lumenswap's DEX",
      category: "Development",
      type: "Bounty",
      dueIn: 7,
      applications: 31,
      amount: 10000,
      amountUsd: 3000,
      description:
        "Build an automated trading bot that can interact with Lumenswap's DEX API to execute trades based on configurable strategies and market conditions.",
      status: "Open",
    },
    {
      id: 4,
      company: "Aquarius Stellar",
      logo: "/aquarius-logo.png",
      bgColor: "bg-purple-600",
      title: "Create educational content about Aquarius Stellar's governance model",
      category: "Content",
      type: "Bounty",
      dueIn: 4,
      applications: 8,
      amount: 3500,
      amountUsd: 1050,
      description:
        "Develop educational materials explaining Aquarius Stellar's governance model, including how proposals are submitted, voted on, and implemented within the ecosystem.",
      status: "Completed",
    },
    {
      id: 5,
      company: "Etherfuse",
      logo: "/etherfuse-logo.png",
      bgColor: "bg-yellow-300",
      title: "Build a demo app using Etherfuse's Stellar-Ethereum bridge",
      category: "Development",
      type: "Project",
      dueIn: 10,
      applications: 15,
      amount: 12000,
      amountUsd: 3600,
      description:
        "Create a demonstration application that showcases the capabilities of Etherfuse's Stellar-Ethereum bridge, allowing users to transfer assets between both blockchains.",
      status: "Open",
    },
    {
      id: 6,
      company: "Tellus Corporative",
      logo: "/tellus-logo.png",
      bgColor: "bg-blue-500",
      title: "Create a video explainer for Tellus Corporative's sustainable finance platform",
      category: "Content",
      type: "Bounty",
      dueIn: 6,
      applications: 7,
      amount: 4500,
      amountUsd: 1350,
      description:
        "Produce a professional video explainer that clearly communicates how Tellus Corporative's sustainable finance platform works and its positive environmental impact.",
      status: "In Review",
    },
    {
      id: 7,
      company: "Decaf Wallet",
      logo: "/decaf-logo.png",
      bgColor: "bg-purple-600",
      title: "Develop a browser extension for Decaf Wallet",
      category: "Development",
      type: "Grant",
      dueIn: 14,
      applications: 22,
      amount: 15000,
      amountUsd: 4500,
      description:
        "Build a browser extension that integrates Decaf Wallet functionality, allowing users to interact with dApps and manage their crypto assets directly from their browser.",
      status: "Open",
    },
    {
      id: 8,
      company: "Lobstr",
      logo: "/lobstr-logo.png",
      bgColor: "bg-blue-400",
      title: "Create a series of tutorials for Lobstr wallet's new features",
      category: "Content",
      type: "Bounty",
      dueIn: 8,
      applications: 19,
      amount: 6000,
      amountUsd: 1800,
      description:
        "Develop a comprehensive series of tutorials that explain Lobstr wallet's new features, including step-by-step guides for users of all experience levels.",
      status: "Completed",
    },
  ]

  // Filter jobs based on active filter and status
  const filteredJobs = jobs
    .filter((job) => (activeFilter === "All" ? true : job.category === activeFilter))
    .filter((job) => (activeStatusFilter === "All" ? true : job.status === activeStatusFilter))

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <header className="border-b border-gray-200">
        <div className="container mx-auto px-4 flex items-center justify-between h-16">
          <div className="flex items-center space-x-8">
            <Link href="/" className="flex items-center">
              <div className="bg-indigo-500 text-white p-1 rounded mr-1">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 4L4 8L12 12L20 8L12 4Z" fill="currentColor" />
                  <path d="M4 12L12 16L20 12" fill="currentColor" />
                  <path d="M4 16L12 20L20 16" fill="currentColor" />
                </svg>
              </div>
              <span className="font-bold text-xl">build.earn</span>
            </Link>
          </div>

          <nav className="hidden md:flex items-center space-x-6">
            <Link href="#" className="text-gray-600 hover:text-gray-900">
              Bounties
            </Link>
            <Link href="#" className="text-gray-600 hover:text-gray-900">
              Projects
            </Link>
            <Link href="/grants" className="text-gray-600 hover:text-gray-900">
              Grants
            </Link>
          </nav>

          <div className="flex items-center space-x-4">
            <Link href="#" className="text-gray-600 hover:text-gray-900 flex items-center">
              Become a Sponsor <span className="ml-1 h-2 w-2 bg-indigo-500 rounded-full"></span>
            </Link>
            <Link href="#" className="text-gray-600 hover:text-gray-900">
              Login
            </Link>
            <Button className="bg-indigo-500 hover:bg-indigo-600">Sign Up</Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="lg:w-3/4">
            {/* Filter Tabs */}
            <div className="flex space-x-2 mb-6 overflow-x-auto">
              <Badge
                variant="outline"
                className={`rounded-full px-4 py-1 cursor-pointer ${
                  activeFilter === "All"
                    ? "bg-gray-100 border-gray-200 text-gray-900 font-medium"
                    : "border-gray-200 text-gray-600 font-medium hover:bg-gray-50"
                }`}
                onClick={() => setActiveFilter("All")}
              >
                All
              </Badge>
              <Badge
                variant="outline"
                className={`rounded-full px-4 py-1 cursor-pointer ${
                  activeFilter === "Content"
                    ? "bg-green-100 border-green-200 text-green-800 font-medium"
                    : "border-gray-200 text-gray-600 font-medium hover:bg-gray-50"
                }`}
                onClick={() => setActiveFilter("Content")}
              >
                Content
              </Badge>
              <Badge
                variant="outline"
                className={`rounded-full px-4 py-1 cursor-pointer ${
                  activeFilter === "Design"
                    ? "bg-purple-100 border-purple-200 text-purple-800 font-medium"
                    : "border-gray-200 text-gray-600 font-medium hover:bg-gray-50"
                }`}
                onClick={() => setActiveFilter("Design")}
              >
                Design
              </Badge>
              <Badge
                variant="outline"
                className={`rounded-full px-4 py-1 cursor-pointer ${
                  activeFilter === "Development"
                    ? "bg-blue-100 border-blue-200 text-blue-800 font-medium"
                    : "border-gray-200 text-gray-600 font-medium hover:bg-gray-50"
                }`}
                onClick={() => setActiveFilter("Development")}
              >
                Development
              </Badge>
              <Badge
                variant="outline"
                className={`rounded-full px-4 py-1 cursor-pointer ${
                  activeFilter === "Other"
                    ? "bg-orange-100 border-orange-200 text-orange-800 font-medium"
                    : "border-gray-200 text-gray-600 font-medium hover:bg-gray-50"
                }`}
                onClick={() => setActiveFilter("Other")}
              >
                Other
              </Badge>
            </div>

            {/* XLM Price Indicator */}
            <div className="flex items-center justify-end mb-2 text-sm">
              <div className="flex items-center bg-gray-100 px-3 py-1 rounded-full">
                <Image src="/xlm-logo.png" alt="XLM" width={14} height={14} className="mr-1" />
                <span className="font-medium">1 XLM = $0.30 USD</span>
              </div>
            </div>

            {/* Hero Banner with Carousel */}
            <div className="relative bg-sky-300 rounded-lg mb-8 overflow-hidden">
              {/* Carousel implementation */}
              <div className="carousel relative overflow-hidden">
                <div
                  className="flex transition-transform duration-500 ease-in-out"
                  style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                >
                  {/* First Slide */}
                  <div className="min-w-full">
                    <div className="flex flex-col md:flex-row">
                      <div className="p-8 md:w-1/2">
                        <div className="bg-black p-2 rounded inline-block mb-4">
                          <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M20 6H16V4C16 2.89 15.11 2 14 2H10C8.89 2 8 2.89 8 4V6H4C2.89 6 2 6.89 2 8V19C2 20.11 2.89 21 4 21H20C21.11 21 22 20.11 22 19V8C22 6.89 21.11 6 20 6ZM10 4H14V6H10V4Z"
                              fill="white"
                            />
                          </svg>
                        </div>
                        <h2 className="text-3xl font-bold mb-2">Become a Sponsor</h2>
                        <p className="text-lg mb-6">
                          Reach 90,000+ top-tier talent in under 5 clicks. Get high-quality work done across content,
                          development, and design.
                        </p>
                        <div className="flex items-center space-x-4">
                          <Button className="bg-black hover:bg-gray-800 text-white">Get Started</Button>
                          <span className="text-gray-700">Join 1,570+ others</span>
                        </div>
                      </div>
                      <div className="md:w-1/2 relative">
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="relative w-64 h-64">
                            <div className="absolute inset-0 bg-sky-200 rounded-full opacity-80"></div>
                            <div className="absolute inset-0 flex items-center justify-center">
                              <div className="grid grid-cols-3 gap-2">
                                {Array.from({ length: 9 }).map((_, i) => (
                                  <div
                                    key={i}
                                    className="w-12 h-12 bg-white rounded-lg shadow-sm flex items-center justify-center"
                                  >
                                    {i % 3 === 0 && <div className="w-8 h-8 bg-gray-800 rounded"></div>}
                                    {i % 3 === 1 && <div className="w-8 h-8 bg-indigo-500 rounded"></div>}
                                    {i % 3 === 2 && <div className="w-8 h-8 bg-red-500 rounded"></div>}
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Second Slide */}
                  <div className="min-w-full">
                    <div className="flex flex-col md:flex-row">
                      <div className="p-8 md:w-1/2">
                        <div className="bg-indigo-600 p-2 rounded inline-block mb-4">
                          <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="white" />
                            <path d="M2 17L12 22L22 17" fill="white" />
                            <path d="M2 12L12 17L22 12" fill="white" />
                          </svg>
                        </div>
                        <h2 className="text-3xl font-bold mb-2">Find Top Talent</h2>
                        <p className="text-lg mb-6">
                          Connect with skilled developers, designers, and content creators in the crypto space. Post
                          bounties and get quality work done quickly.
                        </p>
                        <div className="flex items-center space-x-4">
                          <Button className="bg-indigo-600 hover:bg-indigo-700 text-white">Post a Bounty</Button>
                          <span className="text-gray-700">500+ active bounties</span>
                        </div>
                      </div>
                      <div className="md:w-1/2 relative">
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="relative w-64 h-64">
                            <div className="absolute inset-0 bg-indigo-200 rounded-full opacity-80"></div>
                            <div className="absolute inset-0 flex items-center justify-center">
                              <div className="grid grid-cols-3 gap-2">
                                {Array.from({ length: 9 }).map((_, i) => (
                                  <div
                                    key={`slide2-${i}`}
                                    className="w-12 h-12 bg-white rounded-lg shadow-sm flex items-center justify-center"
                                  >
                                    {i % 3 === 0 && <div className="w-8 h-8 bg-indigo-500 rounded"></div>}
                                    {i % 3 === 1 && <div className="w-8 h-8 bg-green-500 rounded"></div>}
                                    {i % 3 === 2 && <div className="w-8 h-8 bg-yellow-500 rounded"></div>}
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Carousel Controls */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                {Array.from({ length: totalSlides }).map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className={`h-2 w-2 bg-white rounded-full transition-opacity ${currentSlide === index ? "opacity-100" : "opacity-50"}`}
                    aria-label={`Slide ${index + 1}`}
                  ></button>
                ))}
              </div>

              {/* Left/Right Navigation Arrows */}
              <button
                onClick={prevSlide}
                className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/30 hover:bg-white/50 rounded-full p-2"
                aria-label="Previous slide"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M15 18L9 12L15 6"
                    stroke="black"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/30 hover:bg-white/50 rounded-full p-2"
                aria-label="Next slide"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M9 6L15 12L9 18"
                    stroke="black"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>

            {/* Freelance Gigs */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <span className="mr-2">💰</span>
                  <h3 className="text-lg font-medium">Freelance Gigs</h3>
                </div>
                <div className="flex space-x-6 text-sm">
                  <Link
                    href="#"
                    className={`font-medium pb-1 ${
                      activeStatusFilter === "Open"
                        ? "border-b-2 border-indigo-500 text-gray-900"
                        : "text-gray-500 hover:text-blue-500 hover:bg-blue-50 px-2 py-1 rounded transition-colors"
                    }`}
                    onClick={(e) => {
                      e.preventDefault()
                      setActiveStatusFilter("Open")
                    }}
                  >
                    Open
                  </Link>
                  <Link
                    href="#"
                    className={`font-medium pb-1 ${
                      activeStatusFilter === "In Review"
                        ? "border-b-2 border-indigo-500 text-gray-900"
                        : "text-gray-500 hover:text-blue-500 hover:bg-blue-50 px-2 py-1 rounded transition-colors"
                    }`}
                    onClick={(e) => {
                      e.preventDefault()
                      setActiveStatusFilter("In Review")
                    }}
                  >
                    In Review
                  </Link>
                  <Link
                    href="#"
                    className={`font-medium pb-1 ${
                      activeStatusFilter === "Completed"
                        ? "border-b-2 border-indigo-500 text-gray-900"
                        : "text-gray-500 hover:text-blue-500 hover:bg-blue-50 px-2 py-1 rounded transition-colors"
                    }`}
                    onClick={(e) => {
                      e.preventDefault()
                      setActiveStatusFilter("Completed")
                    }}
                  >
                    Completed
                  </Link>
                  <Link
                    href="#"
                    className={`font-medium pb-1 ${
                      activeStatusFilter === "All"
                        ? "border-b-2 border-indigo-500 text-gray-900"
                        : "text-gray-500 hover:text-blue-500 hover:bg-blue-50 px-2 py-1 rounded transition-colors"
                    }`}
                    onClick={(e) => {
                      e.preventDefault()
                      setActiveStatusFilter("All")
                    }}
                  >
                    View All
                  </Link>
                </div>
              </div>

              <h4 className="font-medium mb-4">
                {activeFilter === "All" ? "All" : activeFilter} {activeStatusFilter} Gigs
                {filteredJobs.length > 0 && <span className="text-gray-500 text-sm ml-2">({filteredJobs.length})</span>}
              </h4>

              {/* Job Listings */}
              <div className="space-y-4">
                {filteredJobs.length > 0 ? (
                  filteredJobs.map((job) => (
                    <div
                      key={job.id}
                      className="border border-gray-200 rounded-lg p-4 flex items-start hover:shadow-md transition-shadow duration-200 cursor-pointer"
                      onClick={() => openJobDetail(job)}
                    >
                      <div className="mr-4">
                        <div
                          className={`w-12 h-12 ${job.bgColor} rounded-lg flex items-center justify-center overflow-hidden`}
                        >
                          <Image src={job.logo || "/placeholder.svg"} alt={job.company} width={48} height={48} />
                        </div>
                      </div>
                      <div className="flex-1">
                        <h5 className="font-medium mb-1">{job.title}</h5>
                        <p className="text-gray-600 mb-2">{job.company}</p>
                        <div className="flex items-center text-sm text-gray-500 space-x-4">
                          <div className="flex items-center space-x-2">
                            <span
                              className={`flex items-center ${
                                job.type === "Bounty"
                                  ? "bg-indigo-100 text-indigo-800"
                                  : job.type === "Project"
                                    ? "bg-yellow-100 text-yellow-800"
                                    : "bg-orange-100 text-orange-800"
                              } px-2 py-0.5 rounded-full text-xs`}
                            >
                              <svg
                                className="w-3 h-3 mr-1"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path d="M13 10V3L4 14H11V21L20 10H13Z" fill="currentColor" />
                              </svg>
                              {job.type}
                            </span>
                            <span
                              className={`
                              ${
                                job.category === "Content"
                                  ? "bg-green-100 text-green-800"
                                  : job.category === "Design"
                                    ? "bg-purple-100 text-purple-800"
                                    : job.category === "Development"
                                      ? "bg-blue-100 text-blue-800"
                                      : "bg-orange-100 text-orange-800"
                              } 
                              px-2 py-0.5 rounded-full text-xs`}
                            >
                              {job.category}
                            </span>
                          </div>
                          <span className="flex items-center">
                            <Clock className="w-4 h-4 mr-1" />
                            Due in {job.dueIn}d
                          </span>
                          <span className="flex items-center">
                            <FileText className="w-4 h-4 mr-1" />
                            {job.applications}
                            <span className="ml-1 h-2 w-2 bg-green-500 rounded-full"></span>
                          </span>
                          <span className="flex items-center ml-2">
                            <span
                              className={`h-2 w-2 ${
                                job.status === "Open"
                                  ? "bg-green-500"
                                  : job.status === "In Review"
                                    ? "bg-yellow-500"
                                    : "bg-blue-500"
                              } rounded-full mr-1`}
                            ></span>
                            <span className="text-xs">{job.status}</span>
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <div className="flex items-center">
                          <div className="flex items-center bg-black text-white px-2 py-1 rounded">
                            <Image src="/xlm-logo.png" alt="XLM" width={16} height={16} className="mr-1" />
                            <span className="font-medium">{job.amount.toLocaleString()}</span>
                          </div>
                          <span className="ml-2 text-gray-500">
                            XLM <span className="text-xs">(${job.amountUsd.toLocaleString()} USD)</span>
                          </span>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-10 border border-gray-200 rounded-lg">
                    <div className="text-gray-500 mb-2">No {activeFilter} gigs available at the moment</div>
                    <Button variant="outline" onClick={() => setActiveFilter("All")}>
                      View All Gigs
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:w-1/4 space-y-6">
            {/* Sponsor Card */}
            <div className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center mb-4">
                <h3 className="font-medium">Become a Sponsor</h3>
                <ArrowRight className="ml-2 w-4 h-4" />
              </div>
              <p className="text-gray-600 text-sm mb-4">Reach 90,000+ crypto talent from one single dashboard</p>
              <div className="flex items-center">
                <Image
                  src="/community-platform.svg"
                  alt="Community-Driven Platform"
                  width={120}
                  height={80}
                  className="mr-2"
                />
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4">
              <div className="border border-gray-200 rounded-lg p-4">
                <div className="text-purple-500 mb-2">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1.41 16.09V20h-2.67v-1.93c-1.71-.36-3.16-1.46-3.27-3.4h1.96c.1.93.82 1.62 2.02 1.62 1.19 0 1.78-.63 1.78-1.53 0-.88-.59-1.43-2.02-1.81-1.76-.46-3.37-1.21-3.37-3.23 0-1.49 1.12-2.66 2.9-3.01V4.8h2.67v1.95c1.86.45 2.79 1.86 2.85 3.39H14.3c-.05-.86-.59-1.53-1.78-1.53-1.12 0-1.86.59-1.86 1.53 0 .77.52 1.24 2.02 1.62 1.77.46 3.37 1.16 3.37 3.23-.01 1.79-1.33 2.83-2.64 3.1z"
                      fill="currentColor"
                    />
                  </svg>
                </div>
                <div className="font-bold text-xl">$6,258,620</div>
                <div className="text-gray-500 text-sm">Total Value Earned</div>
              </div>
              <div className="border border-gray-200 rounded-lg p-4">
                <div className="text-purple-500 mb-2">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-2 10H7v-2h10v2z"
                      fill="currentColor"
                    />
                  </svg>
                </div>
                <div className="font-bold text-xl">1830</div>
                <div className="text-gray-500 text-sm">Opportunities Listed</div>
              </div>
            </div>

            {/* Meridian Banner */}
            <div className="border border-gray-200 rounded-lg overflow-hidden">
              <div className="bg-black">
                <Image
                  src="/meridian-2025.png"
                  alt="MERIDIAN 2025 Rio de Janeiro"
                  width={400}
                  height={240}
                  className="w-full"
                />
              </div>
              <div className="p-4 bg-white">
                <div className="text-sm mb-2">TAKE ADVANTAGE OF THESE OPPORTUNITIES</div>
                <div className="font-bold text-xl mb-4">BEFORE MERIDIAN ON SEPTEMBER 17-18</div>
                <Button className="w-full bg-black hover:bg-gray-800 text-white">JOIN US</Button>
              </div>
            </div>

            {/* How It Works */}
            <div className="border border-gray-200 rounded-lg p-6">
              <h3 className="text-gray-500 font-medium mb-6">HOW IT WORKS</h3>

              <div className="space-y-8">
                {/* Step 1 */}
                <div className="flex">
                  <div className="relative">
                    <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M12 12C14.21 12 16 10.21 16 8C16 5.79 14.21 4 12 4C9.79 4 8 5.79 8 8C8 10.21 9.79 12 12 12ZM12 14C9.33 14 4 15.34 4 18V20H20V18C20 15.34 14.67 14 12 14Z"
                          fill="#7C3AED"
                        />
                      </svg>
                    </div>
                    <div className="absolute top-12 bottom-0 left-1/2 w-0.5 bg-gray-200 -translate-x-1/2 h-16"></div>
                  </div>
                  <div className="ml-4">
                    <h4 className="text-indigo-500 font-medium text-lg">Create your Profile</h4>
                    <p className="text-gray-500">by telling us about yourself</p>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="flex">
                  <div className="relative">
                    <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M13 10V3L4 14H11V21L20 10H13Z" fill="#7C3AED" />
                      </svg>
                    </div>
                    <div className="absolute top-12 bottom-0 left-1/2 w-0.5 bg-gray-200 -translate-x-1/2 h-16"></div>
                  </div>
                  <div className="ml-4">
                    <h4 className="text-indigo-500 font-medium text-lg">Participate in Bounties & Projects</h4>
                    <p className="text-gray-500">to build proof of work</p>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="flex">
                  <div className="relative">
                    <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M21 18V19C21 20.1 20.1 21 19 21H5C3.89 21 3 20.1 3 19V5C3 3.9 3.89 3 5 3H19C20.1 3 21 3.9 21 5V6H12C10.89 6 10 6.9 10 8V16C10 17.1 10.89 18 12 18H21ZM12 16H22V8H12V16ZM16 13.5C15.17 13.5 14.5 12.83 14.5 12C14.5 11.17 15.17 10.5 16 10.5C16.83 10.5 17.5 11.17 17.5 12C17.5 12.83 16.83 13.5 16 13.5Z"
                          fill="#7C3AED"
                        />
                      </svg>
                    </div>
                  </div>
                  <div className="ml-4">
                    <h4 className="text-indigo-500 font-medium text-lg">Get Paid for Your Work</h4>
                    <p className="text-gray-500">in global standards</p>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <Button className="w-full bg-indigo-500 hover:bg-indigo-600">Get Started Now</Button>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Job Detail Modal */}
      <JobDetailModal isOpen={isModalOpen} onClose={closeJobDetail} job={selectedJob} />
    </div>
  )
}
