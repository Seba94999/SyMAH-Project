const ICON_PROPS = {
  width: 16,
  height: 16,
  viewBox: "0 0 16 16",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.75,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true,
  focusable: "false",
};

function SvgIcon({ children, className = "", ...props }) {
  return (
    <svg className={`sy-icon ${className}`.trim()} {...ICON_PROPS} {...props}>
      {children}
    </svg>
  );
}

export function PlusIcon(props) {
  return (
    <SvgIcon {...props}>
      <path d="M8 3.5v9" />
      <path d="M3.5 8h9" />
    </SvgIcon>
  );
}

export function PencilIcon(props) {
  return (
    <SvgIcon {...props}>
      <path d="M10.5 2.5l3 3" />
      <path d="M3 11.5 12.5 2a1.06 1.06 0 0 1 1.5 0l.5.5a1.06 1.06 0 0 1 0 1.5L5 13.5l-3 1z" />
      <path d="M2.5 13.5h2.5" />
    </SvgIcon>
  );
}

export function TrashIcon(props) {
  return (
    <SvgIcon {...props}>
      <path d="M2.5 4h11" />
      <path d="M6 4V2.8c0-.44.36-.8.8-.8h2.4c.44 0 .8.36.8.8V4" />
      <path d="M5 4.5h6l-.4 8.2a1 1 0 0 1-1 .8H6.4a1 1 0 0 1-1-.8L5 4.5Z" />
      <path d="M7 7v3.5" />
      <path d="M9 7v3.5" />
    </SvgIcon>
  );
}

export function CalendarIcon(props) {
  return (
    <SvgIcon {...props}>
      <path d="M4 2.75v1.5" />
      <path d="M12 2.75v1.5" />
      <path d="M2.75 5.5h10.5" />
      <path d="M3.5 4h9a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1h-9a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1Z" />
      <path d="M5.25 7.5h1" />
      <path d="M7.75 7.5h1" />
      <path d="M10.25 7.5h1" />
    </SvgIcon>
  );
}

export function CheckIcon(props) {
  return (
    <SvgIcon {...props}>
      <path d="M3 8.25 6.25 11.5 13 4.75" />
    </SvgIcon>
  );
}

export function XIcon(props) {
  return (
    <SvgIcon {...props}>
      <path d="M4 4 12 12" />
      <path d="M12 4 4 12" />
    </SvgIcon>
  );
}

export function ChevronLeftIcon(props) {
  return (
    <SvgIcon {...props}>
      <path d="M9.5 3.75 5.5 8l4 4.25" />
    </SvgIcon>
  );
}

export function ChevronRightIcon(props) {
  return (
    <SvgIcon {...props}>
      <path d="M6.5 3.75 10.5 8l-4 4.25" />
    </SvgIcon>
  );
}

export function SearchIcon(props) {
  return (
    <SvgIcon {...props}>
      <path d="M10.5 10.5 13.5 13.5" />
      <circle cx="6.75" cy="6.75" r="3.75" />
    </SvgIcon>
  );
}

export function UserIcon(props) {
  return (
    <SvgIcon {...props}>
      <circle cx="8" cy="5" r="2.5" />
      <path d="M3.5 13.25c.7-2.35 2.4-3.75 4.5-3.75s3.8 1.4 4.5 3.75" />
    </SvgIcon>
  );
}

export function BuildingIcon(props) {
  return (
    <SvgIcon {...props}>
      <path d="M3 13.5h10" />
      <path d="M4 13.5V4.5l4-2 4 2v9" />
      <path d="M6 6.25h.01" />
      <path d="M8 6.25h.01" />
      <path d="M6 8.75h.01" />
      <path d="M8 8.75h.01" />
    </SvgIcon>
  );
}

export function MapPinIcon(props) {
  return (
    <SvgIcon {...props}>
      <path d="M8 13.25s3.5-3.15 3.5-6A3.5 3.5 0 1 0 4.5 7.25c0 2.85 3.5 6 3.5 6Z" />
      <circle cx="8" cy="7.25" r="1.2" />
    </SvgIcon>
  );
}

export function MailIcon(props) {
  return (
    <SvgIcon {...props}>
      <path d="M3 4.75h10a.75.75 0 0 1 .75.75v5a.75.75 0 0 1-.75.75H3a.75.75 0 0 1-.75-.75v-5A.75.75 0 0 1 3 4.75Z" />
      <path d="m3.25 5.25 4.4 3.15a.95.95 0 0 0 1.1 0l4.4-3.15" />
    </SvgIcon>
  );
}

export function PhoneIcon(props) {
  return (
    <SvgIcon {...props}>
      <path d="M5 2.75h2.25l1.1 2.5-1.2 1.2c.65 1.4 1.8 2.55 3.2 3.2l1.2-1.2 2.5 1.1V12a1.25 1.25 0 0 1-1.25 1.25C7.6 13.25 2.75 8.4 2.75 2.75A1.25 1.25 0 0 1 4 1.5h1Z" />
    </SvgIcon>
  );
}

export function CalendarPlusIcon(props) {
  return (
    <SvgIcon {...props}>
      <path d="M4 2.75v1.5" />
      <path d="M12 2.75v1.5" />
      <path d="M2.75 5.5h10.5" />
      <path d="M3.5 4h9a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1h-9a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1Z" />
      <path d="M8 7.5v3" />
      <path d="M6.5 9h3" />
    </SvgIcon>
  );
}

export function TagIcon(props) {
  return (
    <SvgIcon {...props}>
      <path d="M3.25 7.25V3.5h3.75l6.75 6.75-3.75 3.75L3.25 7.25Z" />
      <circle cx="5.25" cy="5.25" r=".75" />
    </SvgIcon>
  );
}

export function CurrencyIcon(props) {
  return (
    <SvgIcon {...props}>
      <path d="M8 2.75v10.5" />
      <path d="M10.5 4.25a2.25 2.25 0 0 0-2-1.25H6.9a2.15 2.15 0 0 0 0 4.3h2.2a2.15 2.15 0 0 1 0 4.3H6.5a2.25 2.25 0 0 1-2-1.25" />
    </SvgIcon>
  );
}

export function PercentIcon(props) {
  return (
    <SvgIcon {...props}>
      <path d="M11.25 4.75 4.75 11.25" />
      <circle cx="5.25" cy="5.25" r="1.25" />
      <circle cx="10.75" cy="10.75" r="1.25" />
    </SvgIcon>
  );
}

export function BriefcaseIcon(props) {
  return (
    <SvgIcon {...props}>
      <path d="M5 4h6a1 1 0 0 1 1 1v1H4V5a1 1 0 0 1 1-1Z" />
      <path d="M3.5 6h9a1 1 0 0 1 1 1v4.5a1 1 0 0 1-1 1h-9a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1Z" />
      <path d="M6.25 6V4.75A.75.75 0 0 1 7 4h2a.75.75 0 0 1 .75.75V6" />
    </SvgIcon>
  );
}

export function ClockIcon(props) {
  return (
    <SvgIcon {...props}>
      <circle cx="8" cy="8" r="5.5" />
      <path d="M8 5.5V8l1.75 1.25" />
    </SvgIcon>
  );
}
