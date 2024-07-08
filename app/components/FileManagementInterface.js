"use client";
import React, { useState, useRef, useEffect } from "react";
import {
  Folder,
  FileText,
  Image,
  BarChart2,
  File,
  Video,
  Music,
  ChevronLeft,
  ChevronRight,
  Eye,
  Edit,
  Trash2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";

const FileManagementInterface = () => {
  const [activeTab, setActiveTab] = useState("All Files");
  const [searchTerm, setSearchTerm] = useState("");
  const [dateFilter, setDateFilter] = useState("All Dates");
  const [selectedFiles, setSelectedFiles] = useState([]);
  const tabsRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const tabs = [
    { name: "Documents", icon: FileText },
    { name: "Images", icon: Image },
    { name: "Spreadsheets", icon: BarChart2 },
    { name: "Presentations", icon: File },
    { name: "Videos", icon: Video },
    { name: "Audio", icon: Music },
  ];

  const sampleFiles = [
    {
      id: 1,
      name: "Project Report.docx",
      type: "Documents",
      date: "2023-07-01",
    },
    {
      id: 2,
      name: "Financial Overview.xlsx",
      type: "Spreadsheets",
      date: "2023-07-15",
    },
    { id: 3, name: "Company Logo.png", type: "Images", date: "2023-06-28" },
    {
      id: 4,
      name: "Quarterly Presentation.pptx",
      type: "Presentations",
      date: "2023-07-10",
    },
    { id: 5, name: "Meeting Notes.txt", type: "Documents", date: "2023-07-05" },
    { id: 6, name: "Product Demo.mp4", type: "Videos", date: "2023-07-20" },
    { id: 7, name: "Podcast Episode.mp3", type: "Audio", date: "2023-07-18" },
  ];

  const handleTabScroll = (direction) => {
    if (tabsRef.current) {
      const scrollAmount = direction === "left" ? -200 : 200;
      tabsRef.current.scrollLeft += scrollAmount;
    }
  };

  const handleMouseDown = (e) => {
    if (!tabsRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - tabsRef.current.offsetLeft);
    setScrollLeft(tabsRef.current.scrollLeft);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e) => {
    if (!isDragging || !tabsRef.current) return;
    e.preventDefault();
    const x = e.pageX - tabsRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    tabsRef.current.scrollLeft = scrollLeft - walk;
  };

  useEffect(() => {
    document.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("mousemove", handleMouseMove);
    return () => {
      document.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, [isDragging, startX, scrollLeft]);

  const handleTabChange = (tabName) => {
    if (tabName === "All Files") {
      setActiveTab("All Files");
    } else {
      setActiveTab((prevTab) => (prevTab === tabName ? "All Files" : tabName));
    }
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleDateFilterChange = (value) => {
    setDateFilter(value);
  };

  const handleFileSelect = (fileId) => {
    setSelectedFiles((prev) =>
      prev.includes(fileId)
        ? prev.filter((id) => id !== fileId)
        : [...prev, fileId],
    );
  };

  const handleSelectAll = () => {
    if (selectedFiles.length === filteredFiles.length) {
      setSelectedFiles([]);
    } else {
      setSelectedFiles(filteredFiles.map((file) => file.id));
    }
  };

  const filteredFiles = sampleFiles.filter((file) => {
    const matchesTab = activeTab === "All Files" || file.type === activeTab;
    const matchesSearch = file.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesDate =
      dateFilter === "All Dates" ||
      (dateFilter === "Last 7 Days" &&
        new Date(file.date) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)) ||
      (dateFilter === "Last 30 Days" &&
        new Date(file.date) >
          new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)) ||
      (dateFilter === "Last 90 Days" &&
        new Date(file.date) > new Date(Date.now() - 90 * 24 * 60 * 60 * 1000));
    return matchesTab && matchesSearch && matchesDate;
  });

  const getFileIcon = (fileType) => {
    switch (fileType) {
      case "Documents":
        return <FileText className="w-5 h-5 text-blue-500" />;
      case "Spreadsheets":
        return <BarChart2 className="w-5 h-5 text-green-500" />;
      case "Images":
        return <Image className="w-5 h-5 text-purple-500" />;
      case "Presentations":
        return <File className="w-5 h-5 text-red-500" />;
      case "Videos":
        return <Video className="w-5 h-5 text-yellow-500" />;
      case "Audio":
        return <Music className="w-5 h-5 text-pink-500" />;
      default:
        return <Folder className="w-5 h-5 text-gray-500" />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white p-6 shadow-md">
        <h1 className="text-2xl font-bold mb-6">Q&A Generator</h1>
        <div className="space-y-2">
          {[
            "Upload Files",
            "Generate Q&A",
            "API Settings",
            "Manage Datasets",
            "Edit Q&A Pairs",
            "Training",
            "Chatbot",
            "Analytics",
          ].map((item) => (
            <Button key={item} variant="ghost" className="w-full justify-start">
              {item}
            </Button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 overflow-auto">
        {/* File Upload Section */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">File Upload</h2>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
            <p className="text-gray-500">
              Drag and drop files here or click to select files
            </p>
          </div>
          <Button className="mt-4 bg-blue-600 hover:bg-blue-700 text-white">
            Select Files
          </Button>
        </div>

        {/* File Management Section */}
        <div className="bg-white rounded-lg shadow p-6">
          {/* Header and All Files button */}
          <div className="flex items-center mb-4 space-x-4">
            <h2 className="text-xl font-semibold">Manage Files</h2>
            <Button
              variant={activeTab === "All Files" ? "default" : "outline"}
              className={`${activeTab === "All Files" ? "bg-gray-900 text-white" : "bg-white text-gray-900"} hover:bg-gray-800 hover:text-white`}
              onClick={() => handleTabChange("All Files")}
            >
              <Folder className="w-4 h-4 mr-2" />
              All Files
            </Button>
          </div>

          {/* Tab Scroller */}
          <div className="relative mb-4 flex items-center">
            <Button
              variant="ghost"
              size="sm"
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white h-full border-r border-gray-300"
              onClick={() => handleTabScroll("left")}
              style={{ left: "-12px" }}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <div
              className="overflow-x-auto whitespace-nowrap relative w-full"
              ref={tabsRef}
              onMouseDown={handleMouseDown}
              style={{
                scrollbarWidth: "thin",
                scrollbarColor: "#CBD5E0 #EDF2F7",
                cursor: isDragging ? "grabbing" : "grab",
                padding: "0 24px",
              }}
            >
              <div className="inline-flex space-x-2 pb-2 pt-2">
                {tabs.map((tab) => (
                  <Button
                    key={tab.name}
                    variant={activeTab === tab.name ? "default" : "outline"}
                    className={`flex items-center ${activeTab === tab.name ? "bg-gray-900 text-white" : "bg-white text-gray-900"} hover:bg-gray-800 hover:text-white`}
                    onClick={() => handleTabChange(tab.name)}
                  >
                    <tab.icon className="w-4 h-4 mr-2" />
                    {tab.name}
                  </Button>
                ))}
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white h-full border-l border-gray-300"
              onClick={() => handleTabScroll("right")}
              style={{ right: "-12px" }}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>

          {/* Search and Filters */}
          <div className="flex items-center space-x-2 mb-4">
            <Input
              placeholder="Search files..."
              value={searchTerm}
              onChange={handleSearch}
              className="flex-grow"
            />
            <Select value={dateFilter} onValueChange={handleDateFilterChange}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select Date" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All Dates">All Dates</SelectItem>
                <SelectItem value="Last 7 Days">Last 7 Days</SelectItem>
                <SelectItem value="Last 30 Days">Last 30 Days</SelectItem>
                <SelectItem value="Last 90 Days">Last 90 Days</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* File Actions */}
          <div className="flex space-x-2 mb-4">
            <Button variant="outline" disabled={selectedFiles.length !== 1}>
              <Eye className="w-4 h-4 mr-2" /> Preview
            </Button>
            <Button variant="outline" disabled={selectedFiles.length !== 1}>
              <Edit className="w-4 h-4 mr-2" /> Update
            </Button>
            <Button variant="outline" disabled={selectedFiles.length === 0}>
              <Trash2 className="w-4 h-4 mr-2" /> Delete
            </Button>
          </div>

          {/* File List */}
          <div className="space-y-2">
            <div className="flex items-center bg-gray-100 p-2 rounded font-semibold">
              <Checkbox
                checked={
                  selectedFiles.length === filteredFiles.length &&
                  filteredFiles.length > 0
                }
                onCheckedChange={handleSelectAll}
                className="mr-2"
              />
              <span className="flex-1">Name</span>
              <span>Date</span>
            </div>
            {filteredFiles.map((file) => (
              <div
                key={file.id}
                className="flex items-center justify-between bg-gray-50 p-2 rounded"
              >
                <div className="flex items-center flex-1">
                  <Checkbox
                    checked={selectedFiles.includes(file.id)}
                    onCheckedChange={() => handleFileSelect(file.id)}
                    className="mr-2"
                  />
                  {getFileIcon(file.type)}
                  <span className="ml-2">{file.name}</span>
                </div>
                <span className="text-sm text-gray-500">{file.date}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FileManagementInterface;
