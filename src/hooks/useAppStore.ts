import { AppStore } from "../redux/store";
import { useStore } from "react-redux";

export const useAppStore: () => AppStore = useStore;
