import { getCompanyJob } from "@/lib/api/jobs";
import { Icon } from "@gravity-ui/uikit";
import { Eye, Pencil, TrashBin } from "@gravity-ui/icons";
import React from "react";
import { getLoggedInRecruiterCompany } from "@/lib/api/recruiterCompany";

const getStatusStyle = (status) => {
  if (status === "active") {
    return "bg-green-100 text-green-700";
  }

  if (status === "closed") {
    return "bg-red-100 text-red-700";
  }

  return "bg-gray-100 text-gray-700";
};

const RecruiterJobs = async () => {
  const company = await getLoggedInRecruiterCompany();
  console.log(company)

  const jobs = await getCompanyJob(company._id);
  console.log(jobs)


  return (
    <section className="p-4 md:p-8">
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-gray-950">
          Recruiter/Company Manage All Jobs
        </h2>
        <p className="mt-2 text-sm text-gray-500">
          View, edit, and manage your company job posts.
        </p>
      </div>

      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px]">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                  Job Title
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                  Category
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                  Salary
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                  Deadline
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                  Status
                </th>
                <th className="px-6 py-4 text-center text-sm font-semibold text-gray-600">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {jobs?.length > 0 ? (
                jobs.map((job) => (
                  <tr
                    key={job._id}
                    className="border-t border-gray-100 transition hover:bg-gray-50"
                  >
                    <td className="px-6 py-5">
                      <p className="font-semibold text-gray-950">
                        {job.title || "Untitled Job"}
                      </p>
                      <p className="mt-1 text-xs text-gray-500">
                        {job.jobType} {job.isRemote ? "• Remote" : ""}
                      </p>
                    </td>

                    <td className="px-6 py-5 text-sm text-gray-700">
                      {job.category}
                    </td>

                    <td className="px-6 py-5 text-sm font-medium text-gray-900">
                      {job.currency} {job.salaryMin} - {job.salaryMax}
                    </td>

                    <td className="px-6 py-5 text-sm text-gray-700">
                      {job.deadline}
                    </td>

                    <td className="px-6 py-5">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold capitalize ${getStatusStyle(
                          job.status
                        )}`}
                      >
                        {job.status}
                      </span>
                    </td>

                    <td className="px-6 py-5">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          type="button"
                          className="rounded-xl p-2 text-gray-600 transition hover:bg-blue-50 hover:text-blue-600"
                          title="View Details"
                        >
                          <Icon data={Eye} size={18} />
                        </button>

                        <button
                          type="button"
                          className="rounded-xl p-2 text-gray-600 transition hover:bg-purple-50 hover:text-[#5120E2]"
                          title="Edit Job"
                        >
                          <Icon data={Pencil} size={18} />
                        </button>

                        <button
                          type="button"
                          className="rounded-xl p-2 text-gray-600 transition hover:bg-red-50 hover:text-red-600"
                          title="Delete Job"
                        >
                          <Icon data={TrashBin} size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="6"
                    className="px-6 py-12 text-center text-sm text-gray-500"
                  >
                    No jobs found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default RecruiterJobs;