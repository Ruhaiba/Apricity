import { useState } from "react";
import {
  ThemeProvider,
  createTheme,
  CssBaseline,
  Box,
  Typography,
  Paper,
  Stack,
  TextField,
  Select,
  MenuItem,
  Button,
  Chip,
  Divider,
  Alert,
  CircularProgress,
} from "@mui/material";

const theme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "#050507",
      paper: "#0d0d12",
    },
    primary: {
      main: "#9b6cff",
    },
    secondary: {
      main: "#00e5ff",
    },
  },
  typography: {
    fontFamily:
      '"Inter", "Segoe UI", system-ui, sans-serif',
  },
  shape: {
    borderRadius: 12,
  },
});

const exampleCode = `def find_duplicates(items):
    duplicates = []

    for item in items:
        if items.count(item) > 1:
            duplicates.append(item)

    return list(set(duplicates))`;

function App() {
  const [code, setCode] = useState("");
  const [language, setLanguage] = useState("Python");
  const [intent, setIntent] = useState("Optimize");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const analyze = async () => {
  if (!code.trim()) return;

  setLoading(true);
  setResult(null);

  try {
    const response = await fetch("http://127.0.0.1:8000/analyze", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        code,
        query: intent,
      }),
    });

    if (!response.ok) {
      throw new Error(`Server error: ${response.status}`);
    }

    const data = await response.json();

    setResult({
      language: data.language,
      intent: data.intent,
      solution: data.solution,
      changes: data.verification?.analysis?.map(
        (item) => `${item.code}: ${item.message}`
      ) || ["Analysis completed successfully."],
    });
  } catch (error) {
    console.error("Apricity API error:", error);

    setResult({
      language,
      intent,
      solution: "Unable to analyze code.",
      changes: [error.message],
    });
  } finally {
    setLoading(false);
  }
};

  const loadExample = () => {
    setLanguage("Python");
    setIntent("Optimize");
    setCode(exampleCode);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <Box
        sx={{
          minHeight: "100vh",
          background:
            "radial-gradient(circle at 50% -10%, #291450 0%, #050507 45%)",
          px: { xs: 2, md: 6 },
          py: 5,
        }}
      >
        <Box sx={{ maxWidth: 1400, mx: "auto" }}>

          {/* HEADER */}

          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            mb={8}
          >
            <Typography
              sx={{
                fontWeight: 900,
                letterSpacing: 5,
                fontSize: 20,
              }}
            >
              APRICITY
            </Typography>

            <Chip
              label="THE WARMTH IN WINTER"
              size="small"
              color="primary"
              variant="outlined"
            />
          </Stack>

          {/* HERO */}

          <Box textAlign="center" mb={5}>
            <Typography
              sx={{
                fontSize: { xs: 52, md: 86 },
                fontWeight: 900,
                letterSpacing: -4,
                background:
                  "linear-gradient(135deg,#fff,#a78bfa)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Make Programming Easier.
            </Typography>

            <Typography
              color="text.secondary"
              sx={{ mt: 1 }}
            >
              Your Assistant for Python
            </Typography>
          </Box>

          {/* GREETING */}

          <Paper
            variant="outlined"
            sx={{
              maxWidth: 800,
              mx: "auto",
              mb: 4,
              p: 2,
              textAlign: "center",
              background: "rgba(13,13,18,.8)",
              borderColor: "#29243a",
            }}
          >
            <Typography color="text.secondary" fontSize={13}>
              Give me your code. I'll figure out what it needs.
            </Typography>
          </Paper>

          {/* MAIN WORKSPACE */}

          <Stack
            direction={{ xs: "column", md: "row" }}
            spacing={2}
            alignItems="stretch"
          >

            {/* CODE */}

            <Paper
              variant="outlined"
              sx={{
                flex: 1,
                overflow: "hidden",
                borderColor: "#29243a",
                background: "#0b0b10",
              }}
            >
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                p={2}
              >
                <Typography
                  fontWeight={700}
                  fontSize={12}
                  letterSpacing={1.5}
                >
                  CODE INPUT  ★    ★     ★     ★     ★
                </Typography>

                <Select
                  size="small"
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                >
                  <MenuItem value="Python">
                    Python
                  </MenuItem>
                </Select>
              </Stack>

              <Divider />

              <TextField
                multiline
                fullWidth
                minRows={20}
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder={`Paste your ${language} code here...`}
                variant="standard"
                slotProps={{
                  input: {
                    disableUnderline: true,
                    sx: {
                      px: 2,
                      py: 2,
                      fontFamily: "Consolas, monospace",
                      fontSize: 13,
                      lineHeight: 1.7,
                    },
                  },
                }}
              />

              <Divider />

              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                p={1.5}
              >
                <Typography
                  variant="caption"
                  color="text.secondary"
                >
                  {language}
                </Typography>

                <Stack direction="row" spacing={1}>
                  <Button
                    size="small"
                    variant="outlined"
                    onClick={loadExample}
                  >
                    Example
                  </Button>

                  <Button
                    size="small"
                    variant="contained"
                    onClick={analyze}
                    disabled={loading || !code.trim()}
                  >
                    {loading ? (
                      <CircularProgress size={18} />
                    ) : (
                      " Analyze"
                    )}
                  </Button>
                </Stack>
              </Stack>
            </Paper>

            {/* ANALYSIS */}

            <Paper
              variant="outlined"
              sx={{
                flex: 1,
                overflow: "hidden",
                borderColor: "#29243a",
                background: "#0b0b10",
              }}
            >
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                p={2}
              >
                <Typography
                  fontWeight={700}
                  fontSize={12}
                  letterSpacing={1.5}
                >
                  APRICITY ANALYSIS
                </Typography>

                {result && (
                  <Stack direction="row" spacing={1}>
                    <Chip
                      label={result.language}
                      size="small"
                      color="secondary"
                    />

                    <Chip
                      label={result.intent}
                      size="small"
                      color="primary"
                    />
                  </Stack>
                )}
              </Stack>

              <Divider />

              {!result && !loading && (
                <Stack
                  alignItems="center"
                  justifyContent="center"
                  sx={{ minHeight: 500, p: 4 }}
                  textAlign="center"
                >
                  <Typography
                    fontSize={32}
                    color="primary"
                    mb={2}
                  >
                    ★
                  </Typography>

                  <Typography fontWeight={600}>
                    Ready when you are.
                  </Typography>

                  <Typography
                    color="text.secondary"
                    fontSize={13}
                    mt={1}
                    maxWidth={300}
                  >
                    Apricity will classify, analyze and improve
                    your Python code here.
                  </Typography>
                </Stack>
              )}

              {loading && (
                <Stack
                  alignItems="center"
                  justifyContent="center"
                  sx={{ minHeight: 500 }}
                  spacing={2}
                >
                  <CircularProgress color="primary" />

                  <Typography>
                    Analyzing your code...
                  </Typography>

                  <Typography
                    color="text.secondary"
                    fontSize={12}
                  >
                    Understanding your Python code
                  </Typography>
                </Stack>
              )}

              {result && !loading && (
                <Box p={2.5}>

                  <Typography
                    color="text.secondary"
                    fontSize={11}
                    fontWeight={700}
                    letterSpacing={1.5}
                    mb={1}
                  >
                    SUGGESTED SOLUTION
                  </Typography>

                  <Box
                    component="pre"
                    sx={{
                      m: 0,
                      p: 2,
                      overflow: "auto",
                      background: "#050507",
                      border: "1px solid #22212b",
                      borderRadius: 2,
                      fontSize: 12,
                      lineHeight: 1.7,
                      fontFamily: "Consolas, monospace",
                    }}
                  >
                    {result.solution}
                  </Box>

                  <Typography
                    color="text.secondary"
                    fontSize={11}
                    fontWeight={700}
                    letterSpacing={1.5}
                    mt={3}
                    mb={1}
                  >
                    WHAT CHANGED
                  </Typography>

                  <Box component="ul" sx={{ color: "text.secondary" }}>
                    {result.changes.map((change, i) => (
                      <li key={i}>
                        <Typography fontSize={13}>
                          {change}
                        </Typography>
                      </li>
                    ))}
                  </Box>

                  <Alert
                    severity="success"
                    sx={{ mt: 3 }}
                  >
                    Verification passed
                  </Alert>

                </Box>
              )}
            </Paper>
          </Stack>

          {/* FOOTER */}

          <Typography
            textAlign="center"
            color="text.disabled"
            fontSize={11}
            mt={4}
          >
            APRICITY · Intelligent Python Code Assistant
          </Typography>

        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default App;