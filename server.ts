import express from "express";
import path from "path";
import fs from "fs";
import { createServer as createViteServer } from "vite";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  const csvFilePath = path.join(process.cwd(), "bookings.csv");

  // Ensure CSV header exists
  if (!fs.existsSync(csvFilePath)) {
    const header = "Timestamp,Customer Name,Phone Number,Service Requested,Preferred Date,Preferred Time,Style Choices,Notes,Status\n";
    fs.writeFileSync(csvFilePath, header, "utf8");
  }

  // Health check
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", business: "Had Nails Camden" });
  });

  // Google Sheets / Spreadsheet logging endpoint
  app.post("/api/booking", (req, res) => {
    try {
      const { name, phone, service, date, time, notes, styleChoice } = req.body || {};
      const timestamp = new Date().toISOString();

      const sanitize = (str: any) => `"${String(str || "").replace(/"/g, '""')}"`;

      const row = [
        sanitize(timestamp),
        sanitize(name || "Anonymous"),
        sanitize(phone || "Not provided"),
        sanitize(service || "General Booking"),
        sanitize(date || "Flexible"),
        sanitize(time || "Flexible"),
        sanitize(styleChoice ? JSON.stringify(styleChoice) : "Standard"),
        sanitize(notes || ""),
        sanitize("Pending Confirmation")
      ].join(",") + "\n";

      fs.appendFileSync(csvFilePath, row, "utf8");

      console.log(`[HAD NAILS BOOKING] Recorded enquiry for ${name} (${phone}) - ${service}`);

      res.json({
        success: true,
        message: "Enquiry saved directly to salon booking spreadsheet.",
        timestamp,
        downloadCsvUrl: "/api/bookings/export",
        whatsAppTarget: `https://wa.me/447476909044?text=${encodeURIComponent(`Hi Holli! I just requested a booking for ${service} on ${date} at ${time}. Name: ${name}`)}`
      });
    } catch (err: any) {
      console.error("Booking error:", err);
      res.status(500).json({ success: false, error: "Failed to record booking in spreadsheet." });
    }
  });

  // Download raw spreadsheet (CSV format for Google Sheets / Excel import)
  app.get("/api/bookings/export", (req, res) => {
    if (fs.existsSync(csvFilePath)) {
      res.setHeader("Content-Type", "text/csv");
      res.setHeader("Content-Disposition", 'attachment; filename="had_nails_bookings.csv"');
      res.send(fs.readFileSync(csvFilePath, "utf8"));
    } else {
      res.status(404).send("No bookings record found.");
    }
  });

  // Vite middleware for development vs static serve for production
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Had Nails Camden server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
