import React from 'react'
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";

function Copyright() {
    return (
        <Typography variant="body2" color="text.secondary" textAlign="center" fontSize="12px">
          {"Version 1.0 | Copyright © "}
          <Link color="primary" href="https:botaiml.com">
            BOT AI ML (P) Limited
          </Link>{" "}
          {new Date().getFullYear()}
          {"."}
        </Typography>
      );
}

export default Copyright