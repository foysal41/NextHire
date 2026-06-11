"use client";

import { Card, Button, Chip } from "@heroui/react";
import { Icon } from "@gravity-ui/uikit";
import {
  Briefcase,
  Calendar,
  Globe,
  CircleDollar,
  Code,
  Check,
} from "@gravity-ui/icons";

export default function JobCard({ jobs = [] }) {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
      {jobs.map((job) => (
        <Card
          key={job._id || job.title}
          className="w-full rounded-3xl border border-gray-200 bg-white p-6 shadow-sm"
        >
          <Card.Header className="flex flex-col items-start gap-3 p-0">
            <div className="flex w-full items-start justify-between gap-4">
              <div>
                <Card.Title className="text-2xl font-bold text-gray-950">
                  {job.title}
                </Card.Title>

                <Card.Description className="mt-2 flex items-center gap-2 text-sm text-gray-500">
                  <Icon data={Briefcase} size={16} />
                  {job.category} · {job.jobType}
                </Card.Description>
              </div>

              <Chip color="success" variant="flat" className="capitalize">
                {job.status}
              </Chip>
            </div>
          </Card.Header>

          <div className="my-5 border-t border-gray-200" />

          <Card.Content className="space-y-4 p-0">
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <InfoItem
                icon={CircleDollar}
                label="Salary"
                value={`${job.currency} ${Number(
                  job.salaryMin
                ).toLocaleString()} - ${Number(job.salaryMax).toLocaleString()}`}
              />

              <InfoItem
                icon={Globe}
                label="Location"
                value={job.isRemote ? "Remote" : "On-site"}
              />

              <InfoItem icon={Calendar} label="Deadline" value={job.deadline} />

              <InfoItem
                icon={Code}
                label="Requirements"
                value={job.requirements}
              />
            </div>

            <div className="rounded-2xl bg-gray-50 p-4">
              <p className="mb-1 text-sm font-semibold text-gray-900">
                Responsibilities
              </p>
              <p className="text-sm text-gray-600">{job.responsibilities}</p>
            </div>

            <div className="flex items-center gap-2 rounded-2xl bg-purple-50 p-4 text-sm text-purple-700">
              <Icon data={Check} size={18} />
              <span>{job.benefits}</span>
            </div>
          </Card.Content>

          <Card.Footer className="mt-6 flex items-center justify-between p-0">
            <p className="text-xs text-gray-400">
              Posted: {new Date(job.createdAt).toLocaleDateString()}
            </p>

            <Button
              as="a"
              href={`/jobs/${job._id || job.companyId}/apply`}
              color="primary"
              radius="full"
              className="font-semibold"
            >
              Apply Now
            </Button>
          </Card.Footer>
        </Card>
      ))}
    </div>
  );
}

function InfoItem({ icon, label, value }) {
  return (
    <div className="flex items-start gap-3 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
      <div className="mt-1 text-purple-600">
        <Icon data={icon} size={18} />
      </div>

      <div>
        <p className="text-xs font-medium text-gray-400">{label}</p>
        <p className="mt-1 text-sm font-semibold text-gray-800">{value}</p>
      </div>
    </div>
  );
}