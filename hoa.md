November 2024 (version 1.96)

Show release notes after an update

Welcome to the November 2024 release of Visual Studio Code. There are many updates in this version that we hope you'll like, some of the key highlights include:

Overtype mode - Switch between overwrite or insert mode in the editor
Add imports on paste - Automatically add missing TS/JS imports when pasting code
Test coverage - Quickly filter which code is covered by a specific test
Move views - Easily move views between the Primary and Secondary Side Bar
Terminal ligatures - Use ligatures in the terminal
Extension allow list - Configure which extensions can be installed in your organization
Debug with Copilot - Use copilot-debug terminal command to start a debugging session
Chat context - Add symbols and folders as context Chat and Edits
Move from chat to Copilot Edits - Switch to Copilot Edits to apply code suggestions from Chat
If you'd like to read these release notes online, go to Updates on code.visualstudio.com. Insiders: Want to try new features as soon as possible? You can download the nightly Insiders build and try the latest updates as soon as they are available.

GitHub Copilot
Copilot Edits
Last milestone, we introduced Copilot Edits (currently in preview), which allows you to quickly edit multiple files at once using natural language. Since then, we've continued to iterate on the experience. You can try out Copilot Edits by opening the Copilot menu in the Command Center, and then selecting Open Copilot Edits, or by triggering Ctrl+Shift+I.

Progress and editor controls
Copilot Edits can make multiple changes across different files. You can now more clearly see its progress as edits stream in. And with the editor overlay controls, you can easily cycle through all changes and accept or discard them.


Move chat session to Copilot Edits
You might use the Chat view to explore some ideas for making changes to your code. Instead of applying individual code blocks, you can now move the chat session to Copilot Edits to apply all code suggestions from the session.

Edit with Copilot showing for a chat exchange.

Working set suggested files
In Copilot Edits, the working set determines the files that Copilot Edits can suggest changes for. To help you add relevant files to the working set, for a Git repo, Copilot Edits can now suggest additional files based on the files you've already added. For example, Copilot Edits will suggest files that are often changed together with the files you've already added.

Copilot shows suggested files alongside the Add Files button in the working set. You can also select Add Files and then select Related Files to choose from a list of suggested files.


Restore Edit sessions after restart
Edit sessions are now fully restored after restarting VS Code. This includes the working set, acceptance state, as well as the file state of all past edit steps.

Add to working set from Explorer, Search, and editor
You can add files to your Copilot Edits working set with the new Add File to Copilot Edits context menu action for search results in the Search view and for files in the Explorer view. Additionally, you can also attach a text selection to Copilot Edits from the editor context menu.

Add a file from the explorer view to Copilot Edits

Debugging with Copilot
Configuring debugging can be tricky, especially when you're working with a new project or language. This milestone, we're introducing a new copilot-debug terminal command to help you debug your programs using VS Code. You can use it by prefixing the command that you would normally run with copilot-debug. For example, if you normally run your program using the command python foo.py, you can now run copilot-debug python foo.py to start a debugging session.


After your program exits, you are given options to rerun your program or to view, save, or regenerate the VS Code launch configuration that was used to debug your program.

The terminal shows options to rerun, regenerate, save, or the launch config after a debugging session. Theme: Codesong (preview on vscode.dev)

Tasks Support
Copilot's debugging features, including copilot-debug and the /startDebugging intent, now generate preLaunchTasks as needed for code that needs a compilation step before debugging. This is often the case for compiled languages, such as Rust and C++.

Add Context
We’ve added new ways to include symbols and folders as context in Copilot Chat and Copilot Edits, making it easier to reference relevant information during your workflow.

Symbols
Symbols can now easily be added to Copilot Chat and Copilot Edits by dragging and dropping them from the Outline View or Breadcrumbs into the Chat view.


We’ve also introduced symbol completion in the chat input. By typing # followed by the symbol name, you’ll see suggestions for symbols from files you've recently worked on.


To reference symbols across your entire project, you can use #sym to open a global symbols picker.


Folders
Folders can now be added as context by dragging them from the Explorer, Breadcrumbs, or other views into Copilot Chat.
November 2024 (version 1.96)

Show release notes after an update

Welcome to the November 2024 release of Visual Studio Code. There are many updates in this version that we hope you'll like, some of the key highlights include:

Overtype mode - Switch between overwrite or insert mode in the editor
Add imports on paste - Automatically add missing TS/JS imports when pasting code
Test coverage - Quickly filter which code is covered by a specific test
Move views - Easily move views between the Primary and Secondary Side Bar
Terminal ligatures - Use ligatures in the terminal
Extension allow list - Configure which extensions can be installed in your organization
Debug with Copilot - Use copilot-debug terminal command to start a debugging session
Chat context - Add symbols and folders as context Chat and Edits
Move from chat to Copilot Edits - Switch to Copilot Edits to apply code suggestions from Chat
If you'd like to read these release notes online, go to Updates on code.visualstudio.com. Insiders: Want to try new features as soon as possible? You can download the nightly Insiders build and try the latest updates as soon as they are available.

GitHub Copilot
Copilot Edits
Last milestone, we introduced Copilot Edits (currently in preview), which allows you to quickly edit multiple files at once using natural language. Since then, we've continued to iterate on the experience. You can try out Copilot Edits by opening the Copilot menu in the Command Center, and then selecting Open Copilot Edits, or by triggering Ctrl+Shift+I.

Progress and editor controls
Copilot Edits can make multiple changes across different files. You can now more clearly see its progress as edits stream in. And with the editor overlay controls, you can easily cycle through all changes and accept or discard them.


Move chat session to Copilot Edits
You might use the Chat view to explore some ideas for making changes to your code. Instead of applying individual code blocks, you can now move the chat session to Copilot Edits to apply all code suggestions from the session.

Edit with Copilot showing for a chat exchange.

Working set suggested files
In Copilot Edits, the working set determines the files that Copilot Edits can suggest changes for. To help you add relevant files to the working set, for a Git repo, Copilot Edits can now suggest additional files based on the files you've already added. For example, Copilot Edits will suggest files that are often changed together with the files you've already added.

Copilot shows suggested files alongside the Add Files button in the working set. You can also select Add Files and then select Related Files to choose from a list of suggested files.


Restore Edit sessions after restart
Edit sessions are now fully restored after restarting VS Code. This includes the working set, acceptance state, as well as the file state of all past edit steps.

Add to working set from Explorer, Search, and editor
You can add files to your Copilot Edits working set with the new Add File to Copilot Edits context menu action for search results in the Search view and for files in the Explorer view. Additionally, you can also attach a text selection to Copilot Edits from the editor context menu.

Add a file from the explorer view to Copilot Edits

Debugging with Copilot
Configuring debugging can be tricky, especially when you're working with a new project or language. This milestone, we're introducing a new copilot-debug terminal command to help you debug your programs using VS Code. You can use it by prefixing the command that you would normally run with copilot-debug. For example, if you normally run your program using the command python foo.py, you can now run copilot-debug python foo.py to start a debugging session.


After your program exits, you are given options to rerun your program or to view, save, or regenerate the VS Code launch configuration that was used to debug your program.

The terminal shows options to rerun, regenerate, save, or the launch config after a debugging session. Theme: Codesong (preview on vscode.dev)

Tasks Support
Copilot's debugging features, including copilot-debug and the /startDebugging intent, now generate preLaunchTasks as needed for code that needs a compilation step before debugging. This is often the case for compiled languages, such as Rust and C++.

Add Context
We’ve added new ways to include symbols and folders as context in Copilot Chat and Copilot Edits, making it easier to reference relevant information during your workflow.

Symbols
Symbols can now easily be added to Copilot Chat and Copilot Edits by dragging and dropping them from the Outline View or Breadcrumbs into the Chat view.


We’ve also introduced symbol completion in the chat input. By typing # followed by the symbol name, you’ll see suggestions for symbols from files you've recently worked on.


To reference symbols across your entire project, you can use #sym to open a global symbols picker.


Folders
Folders can now be added as context by dragging them from the Explorer, Breadcrumbs, or other views into Copilot Chat.
November 2024 (version 1.96)

Show release notes after an update

Welcome to the November 2024 release of Visual Studio Code. There are many updates in this version that we hope you'll like, some of the key highlights include:

Overtype mode - Switch between overwrite or insert mode in the editor
Add imports on paste - Automatically add missing TS/JS imports when pasting code
Test coverage - Quickly filter which code is covered by a specific test
Move views - Easily move views between the Primary and Secondary Side Bar
Terminal ligatures - Use ligatures in the terminal
Extension allow list - Configure which extensions can be installed in your organization
Debug with Copilot - Use copilot-debug terminal command to start a debugging session
Chat context - Add symbols and folders as context Chat and Edits
Move from chat to Copilot Edits - Switch to Copilot Edits to apply code suggestions from Chat
If you'd like to read these release notes online, go to Updates on code.visualstudio.com. Insiders: Want to try new features as soon as possible? You can download the nightly Insiders build and try the latest updates as soon as they are available.

GitHub Copilot
Copilot Edits
Last milestone, we introduced Copilot Edits (currently in preview), which allows you to quickly edit multiple files at once using natural language. Since then, we've continued to iterate on the experience. You can try out Copilot Edits by opening the Copilot menu in the Command Center, and then selecting Open Copilot Edits, or by triggering Ctrl+Shift+I.

Progress and editor controls
Copilot Edits can make multiple changes across different files. You can now more clearly see its progress as edits stream in. And with the editor overlay controls, you can easily cycle through all changes and accept or discard them.


Move chat session to Copilot Edits
You might use the Chat view to explore some ideas for making changes to your code. Instead of applying individual code blocks, you can now move the chat session to Copilot Edits to apply all code suggestions from the session.

Edit with Copilot showing for a chat exchange.

Working set suggested files
In Copilot Edits, the working set determines the files that Copilot Edits can suggest changes for. To help you add relevant files to the working set, for a Git repo, Copilot Edits can now suggest additional files based on the files you've already added. For example, Copilot Edits will suggest files that are often changed together with the files you've already added.

Copilot shows suggested files alongside the Add Files button in the working set. You can also select Add Files and then select Related Files to choose from a list of suggested files.


Restore Edit sessions after restart
Edit sessions are now fully restored after restarting VS Code. This includes the working set, acceptance state, as well as the file state of all past edit steps.

Add to working set from Explorer, Search, and editor
You can add files to your Copilot Edits working set with the new Add File to Copilot Edits context menu action for search results in the Search view and for files in the Explorer view. Additionally, you can also attach a text selection to Copilot Edits from the editor context menu.

Add a file from the explorer view to Copilot Edits

Debugging with Copilot
Configuring debugging can be tricky, especially when you're working with a new project or language. This milestone, we're introducing a new copilot-debug terminal command to help you debug your programs using VS Code. You can use it by prefixing the command that you would normally run with copilot-debug. For example, if you normally run your program using the command python foo.py, you can now run copilot-debug python foo.py to start a debugging session.


After your program exits, you are given options to rerun your program or to view, save, or regenerate the VS Code launch configuration that was used to debug your program.

The terminal shows options to rerun, regenerate, save, or the launch config after a debugging session. Theme: Codesong (preview on vscode.dev)

Tasks Support
Copilot's debugging features, including copilot-debug and the /startDebugging intent, now generate preLaunchTasks as needed for code that needs a compilation step before debugging. This is often the case for compiled languages, such as Rust and C++.

Add Context
We’ve added new ways to include symbols and folders as context in Copilot Chat and Copilot Edits, making it easier to reference relevant information during your workflow.

Symbols
Symbols can now easily be added to Copilot Chat and Copilot Edits by dragging and dropping them from the Outline View or Breadcrumbs into the Chat view.


We’ve also introduced symbol completion in the chat input. By typing # followed by the symbol name, you’ll see suggestions for symbols from files you've recently worked on.


To reference symbols across your entire project, you can use #sym to open a global symbols picker.


Folders
Folders can now be added as context by dragging them from the Explorer, Breadcrumbs, or other views into Copilot Chat.