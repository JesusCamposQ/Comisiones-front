import * as React from "react";
import { addDays, format } from "date-fns";
import { es } from "date-fns/locale";

import Button from "@mui/material/Button";
import Popover from "@mui/material/Popover";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

import { Calendar } from 'lucide-react';

import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";

type Props = {
  label?: string;
  date: Date | null;
  setDate: (date: Date) => void;
  className?: string; // optional, if you still want to pass Tailwind classes
  buttonWidth?: number | string; // optional, default 280
};

export function DateCalendarWithPresetsMUI({
  label = "Seleccione una fecha",
  date,
  setDate,
  buttonWidth = 280,
}: Props) {
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);

  const open = Boolean(anchorEl);
  const id = open ? "date-calendar-popover" : undefined;

  const handleOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => setAnchorEl(null);

  const handlePreset = (daysToAdd: number) => {
    setDate(addDays(new Date(), daysToAdd));
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={es}>
      <Button
        variant="outlined"
        onClick={handleOpen}
        startIcon={<Calendar width={18} />}
        sx={{
          width: buttonWidth,
          justifyContent: "flex-start",
          textTransform: "none",
          borderColor: "#e6e6e6",
          color: "#737373",
        }}
      >
        {date ? format(date, "P", { locale: es }) : label}
      </Button>

      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      >
        <Box sx={{ p: 1.5, width: 320, display: "flex", flexDirection: "column", gap: 1.25 }}>
          <FormControl size="small" fullWidth>
            <Select
              displayEmpty
              value=""
              onChange={(e) => handlePreset(Number(e.target.value))}
              renderValue={() => (
                <Typography variant="body2" color="text.secondary">
                  Seleccione
                </Typography>
              )}
            >
              <MenuItem value={0}>Hoy</MenuItem>
              <MenuItem value={1}>Mañana</MenuItem>
              <MenuItem value={3}>En 3 días</MenuItem>
              <MenuItem value={7}>En una semana</MenuItem>
            </Select>
          </FormControl>

          <Box sx={{ border: "1px solid", borderColor: "divider", borderRadius: 1 }}>
            <DateCalendar
              value={date}
              onChange={(newDate) => {
                if (newDate) setDate(newDate);
              }}
            />
          </Box>
        </Box>
      </Popover>
    </LocalizationProvider>
  );
}
