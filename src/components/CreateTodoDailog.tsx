// components/ui/CreateTodoDailog.tsx
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';

type Priority = {
  high: boolean;
  medium: boolean;
  low: boolean;
};

interface CreateTodoDailogProps {
  formData: {
    title: string;
    description: string;
    tags: string[];
    dueDate: string;
    priority: Priority;
  };
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handlePriorityChange: (field: keyof Priority) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  error: string | null;
}

const CreateTodoDailog = ({
  formData,
  handleChange,
  handlePriorityChange,
  handleSubmit,
  isOpen,
  setIsOpen,
  error,
}: CreateTodoDailogProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>Create Todo</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Todo</DialogTitle>
          <DialogDescription>
            Fill out the form below to create a new todo.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Title */}
          <div>
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              name="title"
              type="text"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter todo title"
              required
            />
          </div>

          {/* Description */}
          <div>
            <Label htmlFor="description">Description</Label>
            <Input
              id="description"
              name="description"
              type="text"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter description (optional)"
            />
          </div>

          {/* Priority Checkboxes */}
          <div>
            <Label>Priority</Label>
            <div className="flex space-x-4 mt-2">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="high"
                  checked={formData.priority.high}
                  onCheckedChange={() => handlePriorityChange('high')}
                />
                <Label htmlFor="high">High</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="medium"
                  checked={formData.priority.medium}
                  onCheckedChange={() => handlePriorityChange('medium')}
                />
                <Label htmlFor="medium">Medium</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="low"
                  checked={formData.priority.low}
                  onCheckedChange={() => handlePriorityChange('low')}
                />
                <Label htmlFor="low">Low</Label>
              </div>
            </div>
          </div>

          {/* tags */}
          <div>
            <Label htmlFor="tags">Tags</Label>
            <Input
              id="tags"
              name="tags"
              type="text"
              value={formData.tags}
              onChange={handleChange}
              placeholder="Enter tags (optional)"
            />
          </div>

          {/* duedate */}
          <div>
            <Label htmlFor="duedate">Due Date</Label>
            <Input
              id="duedate"
              name="duedate"
              type="date"
              value={formData.dueDate}
              onChange={handleChange}
              placeholder="Enter due date"
            />
          </div>

          {/* Error Message */}
          {error && <p className="text-red-500 text-sm">{error}</p>}

          {/* Submit Button */}
          <Button type="submit" className="w-full">
            Create Todo
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateTodoDailog;