import { Button, Chip } from "@heroui/react";
import { Icon } from "@gravity-ui/uikit";
import {
  Briefcase,
  Calendar,
  Globe,
  CircleDollar,
  Code,
  Check,
} from "@gravity-ui/icons";
import { getJobById } from "@/lib/api/jobs";

async function Page({ params }) {
  const { id } = await params;
  const job = await getJobById(id);

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <div className="rounded-[28px] border border-gray-200 bg-white p-7 shadow-md">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-950">{job.title}</h1>

            <div className="mt-2 flex items-center gap-2 text-sm text-gray-500">
              <Icon data={Briefcase} size={16} />
              <span>
                {job.category} · {job.jobType}
              </span>
            </div>
          </div>

          <Chip color="success" variant="flat" className="capitalize">
            {job.status}
          </Chip>
        </div>

        <div className="my-8 border-t border-gray-200" />

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <InfoBox
            icon={CircleDollar}
            label="Salary"
            value={`${job.currency} ${Number(job.salaryMin).toLocaleString()} - ${Number(
              job.salaryMax
            ).toLocaleString()}`}
          />

          <InfoBox
            icon={Globe}
            label="Location"
            value={job.isRemote ? "Remote" : "On-site"}
          />

          <InfoBox icon={Calendar} label="Deadline" value={job.deadline} />

          <InfoBox icon={Code} label="Requirements" value={job.requirements} />
        </div>

        <div className="mt-5 rounded-2xl bg-gray-50 p-5">
          <h2 className="font-semibold text-gray-950">Responsibilities</h2>
          <p className="mt-2 text-sm leading-6 text-gray-700">
            {job.responsibilities}
          </p>
        </div>

        <div className="mt-5 flex items-center gap-3 rounded-2xl bg-purple-50 p-5 text-sm font-medium text-purple-700">
          <Icon data={Check} size={18} />
          <span>{job.benefits}</span>
        </div>

        <div className="mt-9 flex items-center justify-between">
          <p className="text-sm text-gray-400">
            Posted: {new Date(job.createdAt).toLocaleDateString()}
          </p>

          <Button
            as="a"
            href={`/jobs/${job._id}/apply`}
            color="primary"
            radius="full"
            size="lg"
            className="font-bold"
          >
            Apply Now
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Page;

function InfoBox({ icon, label, value }) {
  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-[0_3px_12px_rgba(0,0,0,0.08)]">
      <div className="flex items-start gap-3">
        <div className="mt-1 text-purple-600">
          <Icon data={icon} size={18} />
        </div>

        <div>
          <p className="text-sm font-semibold text-gray-400">{label}</p>
          <p className="mt-2 text-base font-bold text-gray-950">{value}</p>
        </div>
      </div>
    </div>
  );
}