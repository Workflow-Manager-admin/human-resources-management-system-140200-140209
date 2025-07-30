#!/bin/bash
cd /home/kavia/workspace/code-generation/human-resources-management-system-140200-140209/hr_management_frontend
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

