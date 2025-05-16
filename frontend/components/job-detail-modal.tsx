import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Clock, FileText, Globe, ExternalLink, Users, Award } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

type JobDetailProps = {
  isOpen: boolean
  onClose: () => void
  job: any
}

export function JobDetailModal({ isOpen, onClose, job }: JobDetailProps) {
  if (!job) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-3 mb-2">
            <div className={`w-12 h-12 ${job.bgColor} rounded-lg flex items-center justify-center overflow-hidden`}>
              <Image src={job.logo || "/placeholder.svg"} alt={job.company} width={48} height={48} />
            </div>
            <div>
              <DialogTitle className="text-xl">{job.title}</DialogTitle>
              <DialogDescription className="text-base font-medium text-gray-700">by {job.company}</DialogDescription>
            </div>
          </div>
        </DialogHeader>

        {/* Status Bar */}
        <div className="flex flex-wrap items-center gap-4 py-3 border-y border-gray-200">
          <div className="flex items-center">
            <span
              className={`flex items-center ${
                job.type === "Bounty"
                  ? "bg-indigo-100 text-indigo-800"
                  : job.type === "Project"
                    ? "bg-yellow-100 text-yellow-800"
                    : "bg-orange-100 text-orange-800"
              } px-3 py-1 rounded-full text-sm`}
            >
              <svg className="w-4 h-4 mr-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M13 10V3L4 14H11V21L20 10H13Z" fill="currentColor" />
              </svg>
              {job.type}
            </span>
          </div>

          <div className="flex items-center">
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
              px-3 py-1 rounded-full text-sm`}
            >
              {job.category}
            </span>
          </div>

          <div className="flex items-center">
            <Globe className="w-4 h-4 mr-1 text-gray-500" />
            <span className="text-gray-700">Global</span>
          </div>

          <div className="flex items-center">
            <FileText className="w-4 h-4 mr-1 text-gray-500" />
            <span className="text-gray-700">{job.applications} submissions</span>
          </div>

          <div className="flex items-center ml-auto">
            <div className="flex items-center bg-black text-white px-3 py-1 rounded">
              <Image src="/xlm-logo.png" alt="XLM" width={16} height={16} className="mr-1" />
              <span className="font-medium">{job.amount.toLocaleString()}</span>
            </div>
            <span className="ml-2 text-gray-500">
              XLM <span className="text-xs">(${job.amountUsd.toLocaleString()} USD)</span>
            </span>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
          {/* Left Column - Details */}
          <div className="md:col-span-2 space-y-6">
            <div>
              <h3 className="text-lg font-medium mb-3">About {job.company}</h3>
              <p className="text-gray-700">
                {job.company} is a {job.category.toLowerCase()} agency specializing in blockchain and Web3 solutions. We
                guide projects through the ecosystem, providing expert support in strategy, development, and community
                growth. Visit{" "}
                <Link href="#" className="text-indigo-600 hover:underline flex items-center inline-flex">
                  https://{job.company.toLowerCase()}.com <ExternalLink className="w-3 h-3 ml-1" />
                </Link>{" "}
                for more information. Our mission with this {job.type.toLowerCase()} is to engage the community by
                sharing experiences and building excitement for our platform.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-3">Mission</h3>
              <p className="text-gray-700">{job.description || job.title}</p>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-3">Scope Detail</h3>
              <ul className="list-disc pl-5 space-y-2 text-gray-700">
                <li>Research and understand the core concepts of our platform</li>
                <li>Create comprehensive documentation that explains key features</li>
                <li>Develop clear examples and use cases for different user types</li>
                <li>Ensure content is accessible to both technical and non-technical audiences</li>
                <li>Format content in a way that can be easily integrated into our knowledge base</li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-3">Submission Requirements</h3>
              <ul className="list-disc pl-5 space-y-2 text-gray-700">
                <li>Format: PDF or Markdown files</li>
                <li>Language: English</li>
                <li>Length: Minimum of 2,000 words</li>
                <li>Must include diagrams or illustrations where appropriate</li>
                <li>Include a table of contents and section headers</li>
                <li>Cite all sources used for research</li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-3">Judging Criteria</h3>
              <ul className="list-disc pl-5 space-y-2 text-gray-700">
                <li>Accuracy and depth of technical information</li>
                <li>Clarity and engagement of writing</li>
                <li>Organization and structure of content</li>
                <li>Quality of examples and illustrations</li>
                <li>Accessibility to different audience types</li>
              </ul>
            </div>
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-6">
            {/* Prizes */}
            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="text-gray-500 font-medium mb-4">Prizes</h3>
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mr-3">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xl font-bold">{job.amount.toLocaleString()} XLM</div>
                  <div className="text-gray-500 text-sm">Total Prizes</div>
                </div>
              </div>
              <div className="flex items-center">
                <div className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center text-gray-500 mr-3 text-xs">
                  1
                </div>
                <div>
                  <div className="font-medium">{(job.amount * 0.7).toLocaleString()} XLM</div>
                  <div className="text-gray-500 text-xs">1st Place</div>
                </div>
              </div>
              <div className="flex items-center mt-2">
                <div className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center text-gray-500 mr-3 text-xs">
                  2
                </div>
                <div>
                  <div className="font-medium">{(job.amount * 0.3).toLocaleString()} XLM</div>
                  <div className="text-gray-500 text-xs">2nd Place</div>
                </div>
              </div>
            </div>

            {/* Timeline */}
            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="text-gray-500 font-medium mb-4">Timeline</h3>
              <div className="flex items-center mb-3">
                <Clock className="w-5 h-5 text-gray-500 mr-2" />
                <div>
                  <div className="text-sm font-medium">Due in {job.dueIn} days</div>
                  <div className="text-gray-500 text-xs">Submission deadline</div>
                </div>
              </div>
              <div className="flex items-center">
                <Users className="w-5 h-5 text-gray-500 mr-2" />
                <div>
                  <div className="text-sm font-medium">{job.applications} submissions</div>
                  <div className="text-gray-500 text-xs">Current participation</div>
                </div>
              </div>
            </div>

            {/* Skills Needed */}
            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="text-gray-500 font-medium mb-4">Skills Needed</h3>
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline" className="bg-gray-100">
                  {job.category}
                </Badge>
                {job.category === "Content" && (
                  <>
                    <Badge variant="outline" className="bg-gray-100">
                      Writing
                    </Badge>
                    <Badge variant="outline" className="bg-gray-100">
                      Research
                    </Badge>
                  </>
                )}
                {job.category === "Design" && (
                  <>
                    <Badge variant="outline" className="bg-gray-100">
                      UI/UX
                    </Badge>
                    <Badge variant="outline" className="bg-gray-100">
                      Figma
                    </Badge>
                  </>
                )}
                {job.category === "Development" && (
                  <>
                    <Badge variant="outline" className="bg-gray-100">
                      JavaScript
                    </Badge>
                    <Badge variant="outline" className="bg-gray-100">
                      React
                    </Badge>
                  </>
                )}
                <Badge variant="outline" className="bg-gray-100">
                  Blockchain
                </Badge>
              </div>
            </div>

            {/* Contact */}
            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="text-gray-500 font-medium mb-4">Contact</h3>
              <Button variant="outline" className="w-full flex items-center justify-center">
                <ExternalLink className="w-4 h-4 mr-2" />
                Reach out
              </Button>
            </div>

            {/* Apply Button */}
            <Button className="w-full bg-indigo-500 hover:bg-indigo-600">Submit Now</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
