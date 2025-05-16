"use client"
import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export default function GrantsPage() {
  const [xlmPrice] = useState(0.3) // XLM price in USD

  const grants = [
    {
      id: 1,
      name: "Soroswap Ecosystem Grants",
      logo: "/soroswap-logo.png",
      bgColor: "from-black to-gray-800",
      amount: "Up to 30,000 XLM",
      amountUsd: 9000,
      description: "Supporting innovative projects building on top of Soroswap's liquidity protocol",
    },
    {
      id: 2,
      name: "Lobstr Developer Fund",
      logo: "/lobstr-logo.png",
      bgColor: "from-blue-400 to-blue-600",
      amount: "Up to 25,000 XLM",
      amountUsd: 7500,
      description: "Funding wallet integrations and tools that enhance the Stellar ecosystem",
    },
    {
      id: 3,
      name: "Aquarius Stellar Grants",
      logo: "/aquarius-logo.png",
      bgColor: "from-purple-600 to-purple-800",
      amount: "10,000-50,000 XLM",
      amountUsd: 15000,
      description: "Supporting governance and community-focused projects on Stellar",
    },
    {
      id: 4,
      name: "Lumenswap Innovation Grants",
      logo: "/lumenswap-logo.png",
      bgColor: "from-black to-gray-800",
      amount: "Up to 35,000 XLM",
      amountUsd: 10500,
      description: "Funding DeFi innovations and trading solutions on the Stellar network",
    },
    {
      id: 5,
      name: "Etherfuse Bridge Grants",
      logo: "/etherfuse-logo.png",
      bgColor: "from-yellow-300 to-yellow-500",
      amount: "Up to 40,000 XLM",
      amountUsd: 12000,
      description: "Supporting cross-chain applications using Etherfuse's Stellar-Ethereum bridge",
    },
    {
      id: 6,
      name: "Decaf Wallet Microgrants",
      logo: "/decaf-logo.png",
      bgColor: "from-purple-600 to-purple-800",
      amount: "5,000-15,000 XLM",
      amountUsd: 4500,
      description: "Funding small projects that improve wallet functionality and user experience",
    },
  ]

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
            <Link href="/" className="text-gray-600 hover:text-gray-900">
              Bounties
            </Link>
            <Link href="#" className="text-gray-600 hover:text-gray-900">
              Projects
            </Link>
            <Link href="/grants" className="text-indigo-600 font-medium">
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

      <main className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center max-w-4xl mx-auto mb-16">
          <h1 className="text-5xl font-bold mb-6">Need funds to build out your idea?</h1>
          <p className="text-xl text-gray-600 mb-8">
            Discover the complete list of crypto grants available to support your project. Fast, equity-free funding
            without the hassle.
          </p>
          <div className="flex items-center justify-center space-x-4 text-gray-500">
            <Badge variant="outline" className="px-4 py-1 text-sm bg-gray-50">
              Equity-Free
            </Badge>
            <span>•</span>
            <Badge variant="outline" className="px-4 py-1 text-sm bg-gray-50">
              No Bullshit
            </Badge>
            <span>•</span>
            <Badge variant="outline" className="px-4 py-1 text-sm bg-gray-50">
              Fast AF
            </Badge>
          </div>
        </div>

        {/* XLM Price Indicator */}
        <div className="flex items-center justify-end mb-6 text-sm">
          <div className="flex items-center bg-gray-100 px-3 py-1 rounded-full">
            <Image src="/xlm-logo.png" alt="XLM" width={14} height={14} className="mr-1" />
            <span className="font-medium">1 XLM = ${xlmPrice.toFixed(2)} USD</span>
          </div>
        </div>

        {/* Grants Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {grants.map((grant) => (
            <div
              key={grant.id}
              className="border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
            >
              <div className={`h-48 bg-gradient-to-r ${grant.bgColor} relative flex items-center justify-center`}>
                <div className="absolute inset-0 opacity-20 bg-pattern"></div>
                <div className="relative z-10 w-24 h-24 bg-white rounded-full flex items-center justify-center p-2">
                  <Image
                    src={grant.logo || "/placeholder.svg"}
                    alt={grant.name}
                    width={80}
                    height={80}
                    className="rounded-full"
                  />
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">{grant.name}</h3>
                <div className="flex items-center mb-4">
                  <div className="flex items-center bg-black text-white px-2 py-1 rounded mr-2">
                    <Image src="/xlm-logo.png" alt="XLM" width={16} height={16} className="mr-1" />
                    <span className="font-medium">{grant.amount}</span>
                  </div>
                  <span className="text-gray-500 text-sm">(~${grant.amountUsd.toLocaleString()} USD)</span>
                </div>
                <p className="text-gray-600 mb-6 text-sm">{grant.description}</p>
                <Button className="w-full bg-indigo-500 hover:bg-indigo-600">Apply Now</Button>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-16 bg-gray-50 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Don't see a grant that fits your project?</h2>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            We're constantly adding new grant opportunities. Join our community to be the first to know when new funding
            becomes available.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button className="bg-indigo-500 hover:bg-indigo-600 min-w-[200px]">Join Community</Button>
            <Button variant="outline" className="min-w-[200px]">
              Submit a Grant
            </Button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-50 border-t border-gray-200 mt-20 py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
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
              <p className="text-gray-500 mt-2">The community-driven platform for crypto bounties & grants</p>
            </div>
            <div className="flex space-x-6">
              <Link href="#" className="text-gray-600 hover:text-indigo-500">
                Terms
              </Link>
              <Link href="#" className="text-gray-600 hover:text-indigo-500">
                Privacy
              </Link>
              <Link href="#" className="text-gray-600 hover:text-indigo-500">
                FAQ
              </Link>
              <Link href="#" className="text-gray-600 hover:text-indigo-500">
                Contact
              </Link>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-200 text-center text-gray-500 text-sm">
            © {new Date().getFullYear()} build.earn. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}
