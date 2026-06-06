"use client";

import React from "react";
import { Card, Input, Button } from "@heroui/react";
import { Icon } from "@gravity-ui/uikit";
import { Xmark, MapPin, ArrowUpFromLine } from "@gravity-ui/icons";

function RecruiterCompany() {
  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const companyData = Object.fromEntries(formData.entries());

    console.log("Company Data:", companyData);
  };

  return (
    <section className="min-h-screen bg-white p-4 md:p-8">
      <Card className="mx-auto  overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-xl">
        {/* Header */}
        <div className="flex items-start justify-between border-b border-gray-200 px-6 py-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-950">
              Register New Company
            </h1>
            <p className="mt-1 text-sm text-gray-500">
              Enter your business details to start hiring on NextHire.
            </p>
          </div>

          <button
            type="button"
            className="rounded-full p-2 text-gray-400 transition hover:bg-gray-100 hover:text-gray-700"
          >
            <Icon data={Xmark} size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-6 px-6 py-7 md:grid-cols-2">
            <Input
              name="companyName"
              label="Company Name"
              placeholder="e.g. Acme Corp"
            />

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Industry / Category
              </label>
              <select
                name="industry"
                className="h-12 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 text-gray-900 outline-none focus:border-[#5120E2]"
              >
                <option>Technology</option>
                <option>Finance</option>
                <option>Marketing</option>
                <option>Education</option>
                <option>Healthcare</option>
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Website URL
              </label>

              <div className="flex h-12 overflow-hidden rounded-xl border border-gray-200 bg-gray-50 focus-within:border-[#5120E2]">
                <span className="flex items-center border-r border-gray-200 px-4 text-sm text-gray-500">
                  https://
                </span>

                <input
                  name="website"
                  placeholder="www.company.com"
                  className="w-full bg-transparent px-4 text-sm text-gray-900 outline-none placeholder:text-gray-400"
                />
              </div>
            </div>

            <Input
              name="location"
              label="Location"
              placeholder="City, Country"
              startContent={<Icon data={MapPin} size={18} />}
            />

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Employee Count Range
              </label>
              <select
                name="employeeRange"
                className="h-12 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 text-gray-900 outline-none focus:border-[#5120E2]"
              >
                <option>1-10 employees</option>
                <option>11-50 employees</option>
                <option>51-200 employees</option>
                <option>201-500 employees</option>
                <option>500+ employees</option>
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Company Logo
              </label>

              <label className="flex cursor-pointer items-center gap-4 rounded-xl border border-gray-200 bg-gray-50 p-3 transition hover:border-[#5120E2]/40">
                <div className="flex h-14 w-14 items-center justify-center rounded-xl border border-dashed border-gray-300 bg-white text-gray-500">
                  <Icon data={ArrowUpFromLine} size={18} />
                </div>

                <div>
                  <p className="text-sm font-semibold text-gray-900">
                    Upload image
                  </p>
                  <p className="text-xs text-gray-500">
                    PNG, JPG up to 5MB
                  </p>
                </div>

                <input
                  name="logo"
                  type="file"
                  accept="image/png,image/jpeg,image/jpg"
                  className="hidden"
                />
              </label>
            </div>

            <div className="md:col-span-2">
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Brief Description
              </label>

              <textarea
                name="description"
                rows={5}
                placeholder="Tell us about your company's mission and culture..."
                className="w-full rounded-xl border border-gray-200 bg-gray-50 p-4 text-sm text-gray-900 outline-none placeholder:text-gray-400 focus:border-[#5120E2]"
              />
            </div>
          </div>

          {/* Footer Actions */}
          <div className="flex justify-end gap-3 border-t border-gray-200 bg-gray-50 px-6 py-5">
            <Button
              type="button"
              variant="bordered"
              className="border-gray-300 text-gray-700"
            >
              Cancel
            </Button>

            <Button
              type="submit"
              className="bg-[#5120E2] px-6 font-semibold text-white"
            >
              Register Company
            </Button>
          </div>
        </form>
      </Card>
    </section>
  );
}

export default RecruiterCompany;