"use client";

import React, { useEffect, useState } from "react";
import { Card, Input, Button } from "@heroui/react";
import { Icon } from "@gravity-ui/uikit";
import { Xmark, MapPin, ArrowUpFromLine, Pencil } from "@gravity-ui/icons";

const formLabelClass = "mb-2 block text-sm font-medium text-gray-700";

function RecruiterCompany() {
  // ✅ ADDED: company profile আছে কিনা store করার জন্য
  const [companyProfile, setCompanyProfile] = useState(null);

  // ✅ ADDED: edit mode true হলে input edit করা যাবে
  const [isEditMode, setIsEditMode] = useState(false);

  // ✅ ADDED: upload loading state
  const [isSubmitting, setIsSubmitting] = useState(false);

  // ✅ ADDED: form input value control করার জন্য
  const [formValues, setFormValues] = useState({
    companyName: "",
    industry: "Technology",
    website: "",
    location: "",
    employeeRange: "1-10 employees",
    description: "",
    logo: null,
    logoUrl: "",
  });

  // ✅ ADDED: demo existing data
  // পরে API/database থেকে data আনলে এখানে setCompanyProfile(data) করবে
  useEffect(() => {
    const existingCompanyData = null;

    // ✅ DEBUG
    console.log("Existing Company Data:", existingCompanyData);

    if (existingCompanyData) {
      setCompanyProfile(existingCompanyData);
      setFormValues(existingCompanyData);
    }
  }, []);


















  // ✅ ADDED: ImgBB upload function
  const uploadImageToImgBB = async (imageFile) => {
    try {
      const imageUploadKey = process.env.NEXT_PUBLIC_IMAGE_UPLOAD_API;

      // ✅ DEBUG
      console.log("ImgBB API Key Exists:", !!imageUploadKey);
      console.log("Selected Image File:", imageFile);

      if (!imageUploadKey) {
        throw new Error("ImgBB API key missing. Check .env.local file.");
      }

      const imageData = new FormData();
      imageData.append("image", imageFile);

      const response = await fetch(
        `https://api.imgbb.com/1/upload?key=${imageUploadKey}`,
        {
          method: "POST",
          body: imageData,
        }
      );

      const data = await response.json();

      // ✅ DEBUG
      console.log("ImgBB Full Response:", data);

      if (!data.success) {
        throw new Error("Image upload failed");
      }

      return data.data.url;
    } catch (error) {
      console.error("ImgBB Upload Error:", error);
      return "";
    }
  };




















  // ✅ ADDED: common input change handler
  const handleChange = (e) => {
    const { name, value, files } = e.target;

    const fieldValue = files ? files[0] : value;

    setFormValues((prev) => ({
      ...prev,
      [name]: fieldValue,
    }));

    // ✅ DEBUG
    console.log("Changed Field:", name, fieldValue);
  };




  

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsSubmitting(true);

    try {
      // ✅ DEBUG
      console.log("Before Submit Form Values:", formValues);

      let uploadedLogoUrl = formValues.logoUrl || "";

      // ✅ ADDED: logo file থাকলে ImgBB-তে upload হবে
      if (formValues.logo instanceof File) {
        uploadedLogoUrl = await uploadImageToImgBB(formValues.logo);
      }

      // ✅ ADDED: final company data
      const finalCompanyData = {
        ...formValues,
        logoUrl: uploadedLogoUrl,
      };

      // ✅ File object database-এ save করা উচিত না
      delete finalCompanyData.logo;

      // ✅ DEBUG
      console.log("Final Company Data For Database:", finalCompanyData);

      if (companyProfile && isEditMode) {
        // ✅ UPDATE MODE
        console.log("Updating company profile...");

        setCompanyProfile(finalCompanyData);
        setFormValues({
          ...finalCompanyData,
          logo: null,
        });
        setIsEditMode(false);
      } else {
        // ✅ CREATE MODE
        console.log("Creating new company profile...");

        setCompanyProfile(finalCompanyData);
        setFormValues({
          ...finalCompanyData,
          logo: null,
        });
      }
    } catch (error) {
      console.error("Submit Error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const isViewMode = companyProfile && !isEditMode;

  return (
    <section className="min-h-screen bg-white p-4 md:p-8">
      <Card className="mx-auto overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-xl">
        {/* Header */}
        <div className="flex items-start justify-between border-b border-gray-200 px-6 py-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-950">
              {companyProfile ? "Company Profile" : "Register New Company"}
            </h1>

            <p className="mt-1 text-sm text-gray-500">
              {companyProfile
                ? "View or update your company profile."
                : "Enter your business details to start hiring on NextHire."}
            </p>
          </div>

          <div className="flex items-center gap-2">
            {/* ✅ ADDED: company profile থাকলে Edit button দেখাবে */}
            {companyProfile && !isEditMode && (
              <Button
                type="button"
                size="sm"
                className="bg-[#5120E2] text-white"
                startContent={<Icon data={Pencil} size={16} />}
                onPress={() => {
                  setIsEditMode(true);

                  // ✅ DEBUG
                  console.log("Edit Mode Enabled");
                }}
              >
                Edit
              </Button>
            )}

            <button
              type="button"
              className="rounded-full p-2 text-gray-400 transition hover:bg-gray-100 hover:text-gray-700"
            >
              <Icon data={Xmark} size={18} />
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-6 px-6 py-7 md:grid-cols-2">
            <Input
              name="companyName"
              label="Company Name"
              placeholder="e.g. Acme Corp"
              value={formValues.companyName}
              onChange={handleChange}
              isReadOnly={isViewMode}
            />

            <div>
              <label className={formLabelClass}>Industry / Category</label>

              <select
                name="industry"
                value={formValues.industry}
                onChange={handleChange}
                disabled={isViewMode}
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
              <label className={formLabelClass}>Website URL</label>

              <div className="flex h-12 overflow-hidden rounded-xl border border-gray-200 bg-gray-50 focus-within:border-[#5120E2]">
                <span className="flex items-center border-r border-gray-200 px-4 text-sm text-gray-500">
                  https://
                </span>

                <input
                  name="website"
                  value={formValues.website}
                  onChange={handleChange}
                  readOnly={isViewMode}
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
              value={formValues.location}
              onChange={handleChange}
              isReadOnly={isViewMode}
            />

            <div>
              <label className={formLabelClass}>Employee Count Range</label>

              <select
                name="employeeRange"
                value={formValues.employeeRange}
                onChange={handleChange}
                disabled={isViewMode}
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
              <label className={formLabelClass}>Company Logo</label>

              <label className="flex cursor-pointer items-center gap-4 rounded-xl border border-gray-200 bg-gray-50 p-3 transition hover:border-[#5120E2]/40">
                <div className="flex h-14 w-14 items-center justify-center overflow-hidden rounded-xl border border-dashed border-gray-300 bg-white text-gray-500">
                  {/* ✅ ADDED: logo uploaded হলে preview দেখাবে */}
                  {formValues.logoUrl ? (
                    <img
                      src={formValues.logoUrl}
                      alt="Company Logo"
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <Icon data={ArrowUpFromLine} size={18} />
                  )}
                </div>

                <div>
                  <p className="text-sm font-semibold text-gray-900">
                    {formValues.logo ? formValues.logo.name : "Upload image"}
                  </p>

                  <p className="text-xs text-gray-500">PNG, JPG up to 5MB</p>
                </div>

                <input
                  name="logo"
                  type="file"
                  accept="image/png,image/jpeg,image/jpg"
                  onChange={handleChange}
                  disabled={isViewMode}
                  className="hidden"
                />
              </label>
            </div>

            <div className="md:col-span-2">
              <label className={formLabelClass}>Brief Description</label>

              <textarea
                name="description"
                rows={5}
                value={formValues.description}
                onChange={handleChange}
                readOnly={isViewMode}
                placeholder="Tell us about your company's mission and culture..."
                className="w-full rounded-xl border border-gray-200 bg-gray-50 p-4 text-sm text-gray-900 outline-none placeholder:text-gray-400 focus:border-[#5120E2]"
              />
            </div>
          </div>

          {/* Footer Actions */}
          <div className="flex justify-end gap-3 border-t border-gray-200 bg-gray-50 px-6 py-5">
            {/* ✅ ADDED: edit mode হলে cancel button */}
            {isEditMode && (
              <Button
                type="button"
                variant="bordered"
                className="border-gray-300 text-gray-700"
                onPress={() => {
                  setFormValues({
                    ...companyProfile,
                    logo: null,
                  });
                  setIsEditMode(false);

                  // ✅ DEBUG
                  console.log("Edit Cancelled");
                }}
              >
                Cancel
              </Button>
            )}

            {/* ✅ ADDED: create অথবা edit mode হলেই submit button দেখাবে */}
            {(!companyProfile || isEditMode) && (
              <Button
                type="submit"
                isLoading={isSubmitting}
                disabled={isSubmitting}
                className="bg-[#5120E2] px-6 font-semibold text-white"
              >
                {companyProfile ? "Update Company" : "Register Company"}
              </Button>
            )}
          </div>
        </form>
      </Card>
    </section>
  );
}

export default RecruiterCompany;