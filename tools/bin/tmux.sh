#!/bin/bash

SESSION_NAME="development"

#!/bin/bash

SESSION_NAME="development"

# Kill the existing tmux session if it exists
tmux has-session -t $SESSION_NAME 2>/dev/null

if [ $? == 0 ]; then
  tmux kill-session -t $SESSION_NAME
fi

#tmux new-session -d -s $SESSION_NAME -x "$(tput cols)" -y "$(tput lines)"
#
## Create three columns
#tmux split-window -h -t $SESSION_NAME:0.1
#tmux split-window -h -t $SESSION_NAME:0.2
#
## Split the second and third columns horizontally to create two rows in each
#tmux split-window -v -t $SESSION_NAME:0.3
#tmux split-window -v -t $SESSION_NAME:0.4
#
## Start your processes in the second and third columns
#tmux send-keys -t $SESSION_NAME:0.2 'cd frontend && ng serve --watch' C-m
#tmux send-keys -t $SESSION_NAME:0.3 'cd frontend && node server.js' C-m
#tmux send-keys -t $SESSION_NAME:0.4 'cd backend && npm start' C-m
#tmux send-keys -t $SESSION_NAME:0.5 'cd backend && ./tools/bin/tunnel.sh' C-m
#
## Attach to the session
#tmux attach-session -t $SESSION_NAME
