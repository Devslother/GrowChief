interface TabSwitchProps {
  value: "monthly" | "yearly";
  onChange: (value: "monthly" | "yearly") => void;
}

const TabSwitch = ({ value, onChange }: TabSwitchProps) => {
  return (
    <div className="tab-switch">
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
