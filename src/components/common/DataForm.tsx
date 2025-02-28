import React from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useCustomToast } from "./Toast";

interface Field {
  name: string;
  label: string;
  type: string;
  required?: boolean;
  options?: string[];
}

interface DataFormProps {
  title: string;
  fields: Field[];
  onSubmit: (data: Record<string, any>) => Promise<void>;
  initialData?: Record<string, any>;
  isEdit?: boolean;
}

const DataForm = ({
  title,
  fields,
  onSubmit,
  initialData = {},
  isEdit = false,
}: DataFormProps) => {
  const [formData, setFormData] = React.useState(initialData);
  const [isLoading, setIsLoading] = React.useState(false);
  const { showSuccess, showError } = useCustomToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await onSubmit(formData);
      showSuccess(`${title} ${isEdit ? "updated" : "created"} successfully`);
      setFormData({});
    } catch (error) {
      showError(
        `Failed to ${isEdit ? "update" : "create"} ${title.toLowerCase()}`,
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="p-6 bg-black/40 backdrop-blur-sm border-2 border-purple-500/30">
      <h3 className="text-xl font-semibold text-white mb-4">
        {isEdit ? `Edit ${title}` : `Add New ${title}`}
      </h3>

      <form onSubmit={handleSubmit} className="space-y-4">
        {fields.map((field) => (
          <div key={field.name} className="space-y-2">
            <Label htmlFor={field.name}>{field.label}</Label>
            {field.type === "select" ? (
              <select
                id={field.name}
                value={formData[field.name] || ""}
                onChange={(e) =>
                  setFormData({ ...formData, [field.name]: e.target.value })
                }
                className="w-full bg-white/5 border-white/10 text-white rounded-md"
                required={field.required}
              >
                <option value="">Select {field.label}</option>
                {field.options?.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            ) : (
              <Input
                id={field.name}
                type={field.type}
                value={formData[field.name] || ""}
                onChange={(e) =>
                  setFormData({ ...formData, [field.name]: e.target.value })
                }
                className="bg-white/5 border-white/10 text-white"
                required={field.required}
              />
            )}
          </div>
        ))}

        <div className="flex justify-end space-x-2">
          <Button
            type="submit"
            disabled={isLoading}
            className="bg-gradient-to-r from-purple-500 to-cyan-500 text-white"
          >
            {isLoading ? "Processing..." : isEdit ? "Update" : "Create"}
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default DataForm;
