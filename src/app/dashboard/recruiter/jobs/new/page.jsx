"use client";

import { useState } from "react";
import { Card, Input, Button } from "@heroui/react";
import { createJob } from "@/lib/actions/jobs";
import { redirect } from "next/navigation";
import { toast } from "react-toastify";



export default function NewJob() {
  const [loading, setLoading] = useState(false);
  const [isRemote, setIsRemote] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    const payload = {
      ...data,
      isRemote,
      companyId: "company_123",
      status: "active",
      visibility: "public",
    };

    // console.log(payload);
    const res = await createJob(payload)
    if(res.insertedId){
      toast.success("Job Posted Successfully")
      e.target.reset();
      setIsRemote(false)
      redirect("/dashboard/recruiter")
    }




    // try {
    //   setLoading(true);
    //   alert("Job Created Successfully");
    // } catch (error) {
    //   console.error(error);
    //   alert("Failed to create job");
    // } finally {
    //   setLoading(false);
    // }




  };

  return (
    <section className="min-h-screen bg-white p-4 md:p-8">
      <Card className="mx-auto   border border-gray-200 bg-white p-6 shadow-sm md:p-8">
        <div className="border-b border-gray-200 pb-6">
          <h1 className="text-3xl font-bold text-gray-950">
            Create New Job
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            Fill in job details and publish to candidates.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-10">
          <div>
            <h2 className="mb-5 text-xl font-semibold text-gray-950">
              Job Information
            </h2>

            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              <Input name="title" label="Job Title" placeholder="Frontend Developer" />

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Job Category
                </label>
                <select name="category" className="h-12 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 text-gray-900 outline-none focus:border-[#5120E2]">
                  <option>Technology</option>
                  <option>Design</option>
                  <option>Marketing</option>
                  <option>Finance</option>
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Job Type
                </label>
                <select name="jobType" className="h-12 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 text-gray-900 outline-none focus:border-[#5120E2]">
                  <option>Full-time</option>
                  <option>Part-time</option>
                  <option>Contract</option>
                  <option>Internship</option>
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Currency
                </label>
                <select name="currency" className="h-12 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 text-gray-900 outline-none focus:border-[#5120E2]">
                  <option>USD</option>
                  <option>EUR</option>
                  <option>GBP</option>
                  <option>BDT</option>
                </select>
              </div>

              <Input type="number" name="salaryMin" label="Minimum Salary" placeholder="30000" />
              <Input type="number" name="salaryMax" label="Maximum Salary" placeholder="80000" />
              <Input name="city" label="City" placeholder="Dhaka" disabled={isRemote} />
              <Input name="country" label="Country" placeholder="Bangladesh" disabled={isRemote} />
              <Input type="date" name="deadline" label="Application Deadline" />

              <div className="flex items-center gap-3 rounded-xl border border-gray-200 bg-gray-50 px-4 py-3">
                <input
                  id="remote"
                  type="checkbox"
                  checked={isRemote}
                  onChange={() => setIsRemote(!isRemote)}
                />
                <label htmlFor="remote" className="text-sm font-medium text-gray-800">
                  Remote Job
                </label>
              </div>
            </div>
          </div>

          <div>
            <h2 className="mb-5 text-xl font-semibold text-gray-950">
              Job Description
            </h2>

            <div className="space-y-5">
              {[
                ["responsibilities", "Responsibilities", "Job responsibilities...", 5],
                ["requirements", "Requirements", "Job requirements...", 5],
                ["benefits", "Benefits (Optional)", "Benefits...", 4],
              ].map(([name, label, placeholder, rows]) => (
                <div key={name}>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    {label}
                  </label>
                  <textarea
                    name={name}
                    rows={rows}
                    placeholder={placeholder}
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 p-4 text-gray-900 outline-none placeholder:text-gray-400 focus:border-[#5120E2]"
                  />
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="mb-5 text-xl font-semibold text-gray-950">
              Company
            </h2>

            <div className="rounded-2xl border border-gray-200 bg-gray-50 p-5">
              <p className="text-sm text-gray-500">Posting as</p>
              <h3 className="mt-2 text-xl font-semibold text-gray-950">
                NextHire Ltd.
              </h3>
              <span className="mt-3 inline-block rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
                Approved Company
              </span>
            </div>
          </div>

          <div className="flex justify-end border-t border-gray-200 pt-6">
            <Button
              type="submit"
              isLoading={loading}
              className="bg-[#5120E2] px-8 text-white"
            >
              Publish Job
            </Button>
          </div>
        </form>
      </Card>
    </section>
  );
}