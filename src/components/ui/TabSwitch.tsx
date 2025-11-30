"use client";
import { motion } from "framer-motion";

interface TabSwitchProps {
  value: "monthly" | "yearly";
  onChange: (value: "monthly" | "yearly") => void;
}

const TabSwitch = ({ value, onChange }: TabSwitchProps) => {
  return (
    <div className="tab-switch">
      {/* двигающийся highlight */}
      <motion.div
        className="tab-switch__pill"
        animate={{ translateX: value === "monthly" ? "0%" : "100%" }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      />
      <button
        type="button"
        className={
          value === "monthly"
            ? "tab-switch__item tab-switch__item--active"
            : "tab-switch__item"
        }
        onClick={() => onChange("monthly")}
      >
        <span className="font-body-5">Monthly</span>
      </button>

      <button
        type="button"
        className={
          value === "yearly"
            ? "tab-switch__item tab-switch__item--active"
            : "tab-switch__item"
        }
        onClick={() => onChange("yearly")}
      >
        <span className="font-body-5">Yearly</span>
      </button>
    </div>
  );
};

export default TabSwitch;
