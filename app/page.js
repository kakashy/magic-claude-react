import Image from "next/image";
import FileManagementInterface from "./components/FileManagementInterface";
import DatePicker from "@/components/claude/date-picker";
// import { DatePickerDemo } from "@/components/ui/date-picker";

export default function Home() {
  return (
    // <FileManagementInterface />
    <DatePicker />
    // <DatePickerDemo />
  );
}
