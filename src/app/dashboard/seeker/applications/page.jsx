import { getApplicationByApplicant } from "@/lib/api/application";
import { getUserSession } from "@/lib/core/session";
import Link from "next/link";
import React from "react";

async function Page() {
  const user = await getUserSession();
  const jobs = await getApplicationByApplicant(user.id);

  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-gray-900">
          My Applications
        </h2>
        <p className="mt-1 text-gray-500">
          Total Applications: {jobs.length}
        </p>
      </div>

      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr className="text-left">
              <th className="px-5 py-4">Job Title</th>
              <th className="px-5 py-4">Applicant</th>
              <th className="px-5 py-4">Phone</th>
              <th className="px-5 py-4">Resume</th>
              <th className="px-5 py-4">Applied Date</th>
              <th className="px-5 py-4">Status</th>
            </tr>
          </thead>

          <tbody>
            {jobs.map((job) => (
              <tr
                key={job._id}
                className="border-t border-gray-100 hover:bg-gray-50"
              >
                <td className="px-5 py-4">
                  <div>
                    <p className="font-semibold text-gray-900">
                      {job.jobTitle}
                    </p>
                    <p className="text-xs text-gray-500">
                      ID: {job.jobId}
                    </p>
                  </div>
                </td>

                <td className="px-5 py-4">
                  <p className="font-medium">{job.applicantName}</p>
                  <p className="text-sm text-gray-500">
                    {job.applicantEmail}
                  </p>
                </td>

                <td className="px-5 py-4">{job.phone}</td>

                <td className="px-5 py-4">
                  <Link
                    href={job.resume}
                    target="_blank"
                    className="font-medium text-[#5120E2] hover:underline"
                  >
                    View Resume
                  </Link>
                </td>

                <td className="px-5 py-4">
                  {new Date(job.createdAt).toLocaleDateString()}
                </td>

                <td className="px-5 py-4">
                  <span className="rounded-full bg-yellow-100 px-3 py-1 text-xs font-semibold text-yellow-700">
                    Pending
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {jobs.length === 0 && (
          <div className="p-10 text-center">
            <h3 className="text-lg font-semibold">
              No Applications Found
            </h3>
            <p className="mt-2 text-gray-500">
              You have not applied for any jobs yet.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Page;