# Bash — Fundamentals

Reference tutorial. Every command was run on a real Linux shell (GNU coreutils, bash 5). Output shown is real, except where marked **not tested here** — those needed a network or a service the sandbox didn't have.

Each topic: syntax → example → output → tasks. Do the tasks before moving on. The project is at the end.

---

## 0. Setup

Bash is already on macOS and Linux.

```bash
bash --version
echo $SHELL
```

**macOS ships bash 3.2 from 2007** for licensing reasons, and the default shell is zsh. Install a modern bash:

```bash
brew install bash coreutils
/opt/homebrew/bin/bash --version
```

`coreutils` matters more than it sounds. macOS uses **BSD** versions of `sed`, `awk`, `date` and others; Linux uses **GNU**. The flags differ. Homebrew's coreutils installs the GNU versions prefixed with `g` (`gsed`, `gawk`), so your scripts behave the same on your Mac as on a server.

The one that bites everyone:

```bash
sed -i 's/a/b/' file        # GNU (Linux) — works
sed -i '' 's/a/b/' file     # BSD (macOS) — needs an empty argument
```

Run a script:

```bash
bash script.sh          # run with bash
./script.sh             # run directly — needs +x and a shebang
chmod +x script.sh      # make it executable
```

---

## 1. Bash commands — the shape of them

Every command follows the same pattern:

```bash
command [options] [arguments]
```

```bash
ls -l -a /tmp
ls -la /tmp             # short options can be combined
ls --all /tmp           # long form
```

| Part | Meaning |
|---|---|
| `command` | the program |
| `-x` | short option (single letter) |
| `--word` | long option |
| `argument` | what to act on — usually a file or path |

Two symbols you need immediately:

```bash
~           # your home directory
.           # current directory
..          # parent directory
/           # root of the filesystem
*           # wildcard: any characters
?           # wildcard: exactly one character
```

**Tab completion** finishes filenames. **Up arrow** recalls previous commands. `Ctrl-C` cancels, `Ctrl-D` ends input, `Ctrl-L` clears.

### Tasks
1. Run `ls`, `ls -l`, `ls -la` and compare the output.
2. Run a command with a long option and its short equivalent.
3. Use tab completion to enter a long filename.
4. Press up arrow to recall and rerun a command.
5. Use `history` to see your last 10 commands.

---

## 2. pwd — print working directory

```bash
pwd
```

```
/tmp/bt
```

Tells you where you are. The shell always has a current directory, and relative paths are resolved from it.

### Tasks
1. Print your current directory.
2. Move to your home with `cd ~`, then run `pwd`.
3. Move to `/` and run `pwd`.

---

## 3. cd — change directory

```bash
cd [path]
```

```bash
cd /tmp/bt          # absolute path
cd project          # relative path
cd ..               # up one level
cd ../..            # up two
cd ~                # home
cd                  # home (no argument)
cd -                # previous directory
```

| Path | Means |
|---|---|
| `/tmp/bt` | absolute — starts from root |
| `project` | relative — from where you are |
| `..` | parent |
| `~` | home |
| `-` | the directory you were in before |

`cd -` is the one people don't know and use constantly once they do.

### Tasks
1. Navigate to `/tmp` with an absolute path.
2. Create a directory, `cd` into it with a relative path.
3. Go up two levels with `../..`.
4. Jump home with `cd`, then back with `cd -`.
5. Try `cd /nonexistent`. Read the error.

---

## 4. ls — list

```bash
ls [options] [path]
```

```bash
ls
ls -l project
ls -la
ls -lh project/a.txt
ls -R project
```

```
--- ls -l ---
total 8
-rw-r--r-- 1 root root    0 Aug 25 20:22 a.txt
-rw-r--r-- 1 root root    0 Aug 25 20:22 b.log
drwxr-xr-x 2 root root 4096 Aug 25 20:22 docs
drwxr-xr-x 2 root root 4096 Aug 25 20:22 src

--- ls -R ---
project:
a.txt
b.log
docs
src
```

| Option | Does |
|---|---|
| `-l` | long format: permissions, owner, size, date |
| `-a` | include hidden files (starting with `.`) |
| `-h` | human-readable sizes (K, M, G) — use with `-l` |
| `-R` | recurse into subdirectories |
| `-t` | sort by modification time, newest first |
| `-S` | sort by size |
| `-r` | reverse the sort |
| `-d` | the directory itself, not its contents |

Reading `-rw-r--r--`: the first character is the type (`-` file, `d` directory, `l` symlink), then three groups of three for **owner, group, others**. Topic 25 covers this in full.

`ls -lat` is the combination you will type most — long, all, newest first.

### Tasks
1. List a directory in long format.
2. Show hidden files.
3. Show human-readable sizes.
4. Sort a directory by modification time, newest first.
5. Sort by size, largest first, using `-lS`.
6. List only the directory entry itself with `ls -ld /tmp`.

---

## 5. echo — print

```bash
echo [options] text
```

```bash
echo "plain text"
echo -n "no newline"; echo " <- continued"
echo -e "tab\there\nnewline"

name="Mantas"
echo "Hello $name"
echo 'Hello $name  <- single quotes do not expand'
echo "Path is: $HOME"
echo "Command substitution: today is $(date +%Y-%m-%d)"
echo "Arithmetic: $((7 * 6))"
echo "Brace expansion:" {a,b,c}.txt
echo "Range:" {1..5}
```

```
plain text
no newline <- continued
tab	here
newline
Hello Mantas
Hello $name  <- single quotes do not expand
Path is: /root
Command substitution: today is 2026-08-25
Arithmetic: 42
Brace expansion: a.txt b.txt c.txt
Range: 1 2 3 4 5
```

| Option | Does |
|---|---|
| `-n` | no trailing newline |
| `-e` | interpret `\n`, `\t`, `\\` |

**Double quotes expand variables. Single quotes do not.** That is the single most important quoting rule in bash.

**`printf` is better than `echo` for anything formatted** — it is portable and supports format specifiers:

```bash
printf '%s is %d years old\n' "Mantas" 20
printf '%-10s %6.2f\n' "item" 3.14159
```

`echo -e` behaves differently across shells (it printed `-e` literally when I ran it under `sh` instead of `bash`). `printf` does not have that problem.

### Tasks
1. Print a sentence containing a variable.
2. Print the same sentence in single quotes and compare.
3. Print a tab-separated pair with `-e`.
4. Print today's date with command substitution.
5. Print the result of `15 * 4` with `$(( ))`.
6. Use brace expansion to create `file1.txt` through `file5.txt` with `touch`.
7. Format a table row with `printf` using `%-10s` and `%6.2f`.

---

## 6. cat — concatenate and print

```bash
cat [options] file...
```

```bash
cat project/a.txt
cat -n project/a.txt
cat project/a.txt project/b.log
```

```
line one
line two
line three

--- cat -n ---
     1	line one
     2	line two
     3	line three
```

| Option | Does |
|---|---|
| `-n` | number every line |
| `-b` | number non-blank lines only |
| `-A` | show tabs, line ends and non-printing characters |

Related viewers:

| Command | For |
|---|---|
| `cat` | short files |
| `less` | long files — scroll, `/` to search, `q` to quit |
| `head` | first lines |
| `tail` | last lines |

**Don't `cat` a large file** — it floods your terminal. Use `less`.

### Heredoc — write a file inline

```bash
cat > project/here.txt <<'EOF'
written with a heredoc
literal $HOME not expanded
EOF
```

```
written with a heredoc
literal $HOME not expanded
```

Quoting `'EOF'` stops variable expansion. Unquoted `EOF` expands variables inside the block.

### Tasks
1. Display a file with `cat`.
2. Display it with line numbers.
3. Concatenate two files into a third with `>`.
4. Create a 3-line file using a heredoc.
5. Create one with an unquoted heredoc containing `$HOME` and compare.
6. Open a long file with `less`, search with `/`, quit with `q`.

---

## 7. touch — create files and update timestamps

```bash
touch file...
```

```bash
touch project/a.txt
touch file1.txt file2.txt file3.txt
touch {1..5}.log
```

If the file exists, `touch` updates its modification time. If not, it creates an empty one.

| Option | Does |
|---|---|
| `-c` | do not create if missing |
| `-t` | set a specific timestamp |
| `-r ref` | copy the timestamp from another file |

### Tasks
1. Create an empty file.
2. Create five files in one command with brace expansion.
3. Run `ls -l`, `touch` an existing file, and `ls -l` again to see the time change.
4. Use `-c` on a missing file and confirm nothing is created.

---

## 8. mkdir — make directories

```bash
mkdir [options] directory...
```

```bash
mkdir project
mkdir -p project/src/utils
mkdir -p project/{src,docs,tests}
```

| Option | Does |
|---|---|
| `-p` | create parent directories as needed; **no error if it already exists** |
| `-v` | print each directory created |
| `-m` | set permissions at creation |

**Always use `-p` in scripts.** Without it, `mkdir` fails if the directory exists, and with `set -e` that kills your script.

`rmdir` removes an empty directory. For a full one, use `rm -r`.

### Tasks
1. Create a single directory.
2. Create a three-level nested path in one command with `-p`.
3. Create `src`, `docs` and `tests` in one command with brace expansion.
4. Run `mkdir` twice on the same name. Read the error. Then use `-p`.
5. Remove an empty directory with `rmdir`.

---

## 9. cp — copy

```bash
cp [options] source destination
```

```bash
cp project/a.txt project/copy.txt
cp -r project backup
cp -v project/a.txt /tmp/bt/verbose.txt
```

```
'project/a.txt' -> '/tmp/bt/verbose.txt'
```

| Option | Does |
|---|---|
| `-r` | recursive — **required for directories** |
| `-i` | prompt before overwriting |
| `-v` | verbose |
| `-p` | preserve timestamps and permissions |
| `-a` | archive: `-r` plus preserve everything |
| `-u` | only copy if the source is newer |

**`cp` overwrites silently by default.** No warning, no undo. `-i` prompts; `-n` refuses.

**Trailing slashes matter.** `cp -r src dest` behaves differently depending on whether `dest` exists.

### Tasks
1. Copy a file to a new name.
2. Copy a directory recursively.
3. Copy without `-r` and read the error.
4. Overwrite a file, then repeat with `-i` and answer `n`.
5. Copy with `-v` to see what happened.
6. Use `-p` and verify with `ls -l` that the timestamp was preserved.

---

## 10. mv — move and rename

```bash
mv [options] source destination
```

```bash
mv project/copy.txt project/renamed.txt      # rename
mv project/renamed.txt backup/               # move
mv *.log logs/                                # move many
```

**`mv` is both move and rename** — renaming is just moving within the same directory. There is no separate `rename` command in base Unix.

| Option | Does |
|---|---|
| `-i` | prompt before overwriting |
| `-n` | never overwrite |
| `-v` | verbose |
| `-u` | only if the source is newer |

Same warning as `cp`: **`mv` overwrites silently.**

### Tasks
1. Rename a file.
2. Move a file into a subdirectory.
3. Move three files at once with a wildcard.
4. Rename a directory.
5. Move a file onto an existing one with `-i` and cancel.

---

## 11. rm — remove

```bash
rm [options] file...
```

```bash
rm file.txt
rm -f missing.txt          # no error if it does not exist
rm -r directory            # recursive
rm -rf directory           # recursive, forced
```

| Option | Does |
|---|---|
| `-r` | recursive — required for directories |
| `-f` | force — no prompts, no error on missing files |
| `-i` | prompt for every file |
| `-v` | verbose |

```
rm: remove regular file '/tmp/bt/verbose.txt'?
```

**There is no trash and no undo.** `rm` unlinks the file immediately.

**`rm -rf /` destroys the system.** Modern `rm` refuses that exact command, but `rm -rf $VAR/` where `$VAR` is empty expands to `rm -rf /` and does not get the same protection. Always quote and check variables before passing them to `rm`.

Safe habits:

```bash
rm -i file              # prompt
ls target/              # look before you delete
rm -rf "${dir:?}"/*     # :? aborts if dir is empty or unset
```

### Tasks
1. Create a file and delete it.
2. Delete a directory without `-r`. Read the error.
3. Delete a directory with `-r`.
4. Use `-i` and cancel the deletion.
5. Delete a missing file with and without `-f`. Compare.
6. Write `rm -rf "${dir:?}"/*` with `dir` unset and read the protective error.

---

## 12. man — the manual

```bash
man command
```

```bash
man ls
man 2 fork          # section 2: system calls
man -k search       # search by keyword
```

| Section | Contains |
|---|---|
| 1 | user commands |
| 2 | system calls |
| 3 | library functions |
| 5 | file formats |
| 8 | admin commands |

Inside `man`: `/` searches, `n` next match, `q` quits, arrows scroll.

Other help:

```bash
command --help          # quick summary, most commands
help cd                 # for bash BUILTINS — man won't have them
type cd                 # is it a builtin or a program?
which grep              # where the program lives
apropos keyword         # search all man pages
```

**`man cd` fails** because `cd` is a shell builtin, not a program. Use `help cd`. Knowing that distinction is worth having.

### Tasks
1. Open the manual for `ls` and find what `-S` does.
2. Search inside a man page with `/`.
3. Run `man cd` and read the failure. Then `help cd`.
4. Use `type` on `cd`, `ls` and `grep` and compare.
5. Use `man -k` to find commands related to "directory".

---

## 13. alias — shortcuts

```bash
alias name='command'
```

```bash
alias ll='ls -lah'
alias ..='cd ..'
alias gs='git status'
alias rm='rm -i'

alias                   # list all aliases
unalias ll              # remove one
\ls                     # run the real command, ignoring the alias
```

Aliases live only in the current shell. To make them permanent, add them to `~/.bashrc` (Linux) or `~/.zshrc` (macOS default shell):

```bash
echo "alias ll='ls -lah'" >> ~/.bashrc
source ~/.bashrc        # reload without restarting
```

**Aliases do not take arguments.** If you need parameters, write a function instead (topic 30).

### Tasks
1. Create an alias `ll` for `ls -lah` and use it.
2. Create an alias for a command you type often.
3. List all current aliases.
4. Remove an alias with `unalias`.
5. Add an alias to `~/.bashrc` and `source` it.
6. Use `\command` to bypass an alias.

---

## 14. grep — search text

```bash
grep [options] pattern [file...]
```

```bash
grep "ERROR" app.log
grep -c ERROR app.log
grep -n "WARN" app.log
grep -iv "error" app.log
grep -rl "ERROR" .
grep -E "ERROR|WARN" app.log
grep -A1 -B1 "WARN" app.log
```

```
ERROR disk full
ERROR timeout
count: 2
3:WARN low memory
--- -rl ---
./app.log
--- -E ---
ERROR disk full
WARN low memory
ERROR timeout
```

| Option | Does |
|---|---|
| `-i` | case insensitive |
| `-v` | invert — lines that do **not** match |
| `-n` | show line numbers |
| `-c` | count matches |
| `-l` | list filenames only |
| `-r` | recurse into directories |
| `-w` | whole word only |
| `-E` | extended regex (`|`, `+`, `?`, `{}`) |
| `-A n` `-B n` `-C n` | n lines after, before, around |

**`grep -rn "text" .`** is the combination you will use constantly — recursive, with line numbers, from here.

`-E` is what you want for alternation. Without it, `|` is a literal pipe character.

### Tasks
1. Find all lines containing a word in a file.
2. Count matches with `-c`.
3. Show line numbers with `-n`.
4. Invert the match with `-v`.
5. Search case-insensitively.
6. Search recursively through a directory tree with `-rn`.
7. Match either of two words with `-E`.
8. Show one line of context either side with `-C1`.
9. List only the filenames that match with `-l`.

---

## 15. cut — extract columns

```bash
cut [options] [file]
```

```bash
cut -d, -f2 data.csv
cut -d, -f2,4 data.csv
cut -c1-6 data.csv
```

```
--- -f2 ---
name
Mantas
Ona
Jonas

--- -f2,4 ---
name,salary
Mantas,3200
Ona,2800

--- -c1-6 ---
id,nam
1,Mant
```

| Option | Does |
|---|---|
| `-d X` | delimiter (default: tab) |
| `-f N` | field number, 1-based |
| `-f N,M` | several fields |
| `-f N-M` | a range |
| `-c N-M` | character positions instead of fields |
| `--complement` | everything except the selected fields |

**`cut` cannot handle quoted CSV fields.** A value like `"iPhone, Pro"` containing the delimiter breaks it. For real CSV use `awk` with care, or a proper parser.

### Tasks
1. Extract the second column of a comma-separated file.
2. Extract columns 2 and 4.
3. Extract a range of columns with `-f2-4`.
4. Extract the first 10 characters of each line.
5. Combine with `tail -n +2` to skip a header row.
6. Feed a CSV with a quoted comma into `cut` and observe it break.

---

## 16. sort — order lines

```bash
sort [options] [file]
```

```bash
sort file.txt
sort -n numbers.txt
sort -r file.txt
sort -u file.txt
sort -t, -k4 -n data.csv
```

```
--- -t, -k4 -n ---
id,name,dept,salary
4,Rasa,HR,2500
2,Ona,Sales,2800

--- sort -u on a column ---
HR
IT
Sales
```

| Option | Does |
|---|---|
| `-n` | numeric sort |
| `-r` | reverse |
| `-u` | unique — remove duplicates |
| `-t X` | field delimiter |
| `-k N` | sort by field N |
| `-f` | ignore case |
| `-h` | human-readable numbers (2K, 1G) |

**Without `-n`, sort compares as text**, so `10` comes before `9`. This is the classic mistake.

The frequency-count idiom, which you will use forever:

```bash
sort file.txt | uniq -c | sort -rn | head
```

Sort → count duplicates → sort by count descending → top 10. `uniq` only removes *adjacent* duplicates, which is why `sort` must come first.

### Tasks
1. Sort a file of words alphabetically.
2. Sort a file of numbers and note the wrong order, then fix it with `-n`.
3. Sort in reverse.
4. Remove duplicates with `-u`.
5. Sort a CSV by its fourth column numerically.
6. Build the `sort | uniq -c | sort -rn` pipeline to find the most common word in a file.

---

## 17. head and tail

```bash
head [options] [file]
tail [options] [file]
```

```bash
head -2 data.csv
tail -2 data.csv
tail -n +2 data.csv       # skip the first line
tail -f app.log           # follow, live
```

```
--- head -2 ---
id,name,dept,salary
1,Mantas,IT,3200
...
--- tail -2 ---
4,Rasa,HR,2500
5,Petras,Sales,3900
--- tail -n +2 skips header ---
1,Mantas,IT,3200
2,Ona,Sales,2800
```

| Option | Does |
|---|---|
| `-n N` | N lines (default 10) |
| `-c N` | N bytes |
| `tail -f` | follow the file as it grows — **for watching logs** |
| `tail -n +N` | start **from** line N, not the last N |

`tail -f /var/log/syslog` is how you watch a log live. Ctrl-C to stop.

`tail -n +2` is the standard way to skip a CSV header.

### Tasks
1. Show the first 5 lines of a file.
2. Show the last 5 lines.
3. Skip a header row with `tail -n +2`.
4. Combine: `head -20 file | tail -5` to get lines 16–20.
5. Run `tail -f` on a file, append to it from another terminal, and watch it appear.

---

## 18. awk — column processing

`awk` reads line by line, splits into fields, and runs your program on each.

```bash
awk 'pattern { action }' file
```

`$1`, `$2` are fields. `$0` is the whole line. `NR` is the line number. `NF` is the field count.

```bash
awk -F, '{print $2}' data.csv
awk -F, 'NR>1 && $4 > 3000 {print $2, $4}' data.csv
awk -F, 'NR>1 {sum += $4} END {print "total:", sum, " avg:", sum/(NR-1)}' data.csv
awk -F, 'NR>1 {t[$3] += $4; c[$3]++} END {for (d in t) printf "%-6s %d (%d people)\n", d, t[d], c[d]}' data.csv
awk -F, 'NR==2 {print "NR="NR, "NF="NF, "line="$0}' data.csv
```

```
--- filter and compute ---
Mantas 3200
Jonas 4100
Petras 3900

--- sum a column ---
total: 16500  avg: 3300

--- group by dept ---
IT     7300 (2 people)
Sales  6700 (2 people)
HR     2500 (1 people)

--- built-in vars ---
NR=2 NF=4 line=1,Mantas,IT,3200
```

| Variable | Means |
|---|---|
| `$0` | the whole line |
| `$1`, `$2`, ... | fields |
| `NR` | current line number |
| `NF` | number of fields on this line |
| `FS` / `-F` | input field separator |
| `OFS` | output field separator |

| Block | Runs |
|---|---|
| `BEGIN { }` | once, before any input |
| `{ }` | for every line |
| `END { }` | once, after all input |

**awk has associative arrays**, which is why the group-by above works in one line. `t[$3] += $4` accumulates per department with no setup.

`NR>1` is the idiom for skipping a header.

### Tasks
1. Print the second column of a CSV.
2. Print only rows where a numeric column exceeds a value.
3. Sum a column and print the total in an `END` block.
4. Compute an average.
5. Group by one column and sum another, using an array.
6. Print `NR` and `NF` for each line.
7. Use `printf` inside awk to align output in columns.
8. Use a `BEGIN` block to print a header row.

---

## 19. sed — stream editing

```bash
sed [options] 'script' [file]
```

```bash
sed 's/ERROR/CRITICAL/' app.log
echo "aaa bbb aaa" | sed 's/aaa/X/g'
sed -n '2p' data.csv
sed '1d' data.csv
sed '/INFO/d' app.log
sed -i 's/WARN/NOTICE/' tmp.log
sed -e 's/ERROR/E/' -e 's/INFO/I/' app.log
```

```
--- s/ERROR/CRITICAL/ ---
CRITICAL disk full
INFO started

--- global ---
X bbb X

--- -n '2p' ---
1,Mantas,IT,3200

--- delete matching lines ---
ERROR disk full
WARN low memory
ERROR timeout

--- multiple expressions ---
E disk full
I started
WARN low memory
```

| Script | Does |
|---|---|
| `s/old/new/` | substitute, **first match on each line** |
| `s/old/new/g` | substitute all matches |
| `s/old/new/2` | substitute the 2nd match |
| `Np` | print line N (with `-n`) |
| `Nd` | delete line N |
| `/pattern/d` | delete matching lines |
| `/pattern/p` | print matching lines |

| Option | Does |
|---|---|
| `-n` | suppress automatic printing — pair with `p` |
| `-i` | edit the file in place |
| `-e` | add another expression |
| `-E` | extended regex |

**`-i` differs between GNU and BSD:**

```bash
sed -i 's/a/b/' file          # Linux
sed -i '' 's/a/b/' file       # macOS
```

**`-i` has no undo.** Test without it first, or use `-i.bak` to keep a backup.

Use a different delimiter when your pattern contains slashes:

```bash
sed 's|/usr/local|/opt|' file
```

### Tasks
1. Replace the first occurrence of a word on each line.
2. Replace all occurrences with `g`.
3. Print only line 3 with `-n` and `p`.
4. Delete the first line of a file.
5. Delete all lines matching a pattern.
6. Chain two substitutions with `-e`.
7. Edit a file in place with `-i.bak` and check the backup exists.
8. Substitute a path using `|` as the delimiter.

---

## 20. ps — process status

```bash
ps [options]
```

```bash
ps
ps aux
ps -ef
ps aux | grep bash
```

```
--- ps ---
  PID TTY          TIME CMD
    1 ?        00:00:00 process_api
    2 ?        00:00:00 kthreadd

--- ps aux ---
USER       PID %CPU %MEM    VSZ   RSS TTY      STAT START   TIME COMMAND
root         1  1.6  0.1  17072  5792 ?        SLl  20:22   0:00 /process_api ...
```

| Form | Shows |
|---|---|
| `ps` | your processes in this terminal |
| `ps aux` | every process, BSD style — the most common |
| `ps -ef` | every process, System V style |
| `ps -p PID` | one specific process |
| `ps -u user` | one user's processes |

Columns worth knowing: `PID` (process id), `%CPU`, `%MEM`, `STAT` (state: `S` sleeping, `R` running, `Z` zombie), `COMMAND`.

`ps aux | grep name` finds a process by name — note it also matches the `grep` itself, which is why `pgrep name` is cleaner.

### Tasks
1. List your own processes.
2. List all processes with `ps aux`.
3. Find a specific process by name with `grep`.
4. Show one process by PID with `ps -p`.
5. Start `sleep 300 &`, find it in `ps`, note its PID.
6. Use `pgrep sleep` and compare the output.

---

## 21. top — live process monitor

```bash
top
top -bn1        # batch mode, one iteration — for scripts
```

```
top - 20:23:45 up 1 min,  0 user,  load average: 0.00, 0.00, 0.00
Tasks:  52 total,   1 running,  51 sleeping,   0 stopped,   0 zombie
%Cpu(s):  0.0 us, 16.7 sy,  0.0 ni, 83.3 id,  0.0 wa,  0.0 hi,  0.0 si,  0.0 st
MiB Mem :   3997.9 total,   3850.9 free,    224.6 used,     84.3 buff/cache
```

Interactive keys inside `top`:

| Key | Does |
|---|---|
| `q` | quit |
| `k` | kill a process (asks for PID) |
| `M` | sort by memory |
| `P` | sort by CPU |
| `1` | show each CPU core separately |
| `u` | filter by user |

**`htop` is much better** if available — colour, mouse, scrolling, tree view. Install with `brew install htop` or `apt install htop`.

`top -bn1` gives one non-interactive snapshot, which is what you use inside a script.

### Tasks
1. Run `top` and quit with `q`.
2. Sort by memory with `M`, then by CPU with `P`.
3. Run `top -bn1` and pipe it to `head -10`.
4. Install and try `htop`.

---

## 22. df and du — disk usage

```bash
df [options]        # free space per filesystem
du [options] path   # space used by files and directories
```

```bash
df -h
du -sh /tmp/bt
du -h --max-depth=1 /tmp/bt
```

```
--- df -h ---
Filesystem      Size  Used Avail Use% Mounted on
tmpfs           4.0G     0  4.0G   0% /dev/shm
/dev/vda        252G  9.2G  9.4G  50% /

--- du -sh ---
68K	/tmp/bt

--- du -h --max-depth=1 ---
4.0K	/tmp/bt/.hidden
24K	/tmp/bt/project
24K	/tmp/bt/backup
68K	/tmp/bt
```

| Command | Option | Does |
|---|---|---|
| `df` | `-h` | human-readable sizes |
| `df` | `-i` | inode usage instead of bytes |
| `du` | `-h` | human-readable |
| `du` | `-s` | summary only, no per-file breakdown |
| `du` | `--max-depth=N` | how deep to recurse |
| `du` | `-a` | include files, not just directories |

**`df` is about filesystems, `du` is about directories.** When a disk fills up, `df -h` tells you which filesystem, then `du -sh *` in that filesystem tells you what is eating it.

The "what's filling my disk" one-liner:

```bash
du -h --max-depth=1 . | sort -rh | head
```

Note `sort -rh` — `-h` sorts human-readable sizes correctly, so `2G` comes before `900M`.

### Tasks
1. Show free space on all filesystems.
2. Show the total size of a directory with `du -sh`.
3. List the sizes of every immediate subdirectory.
4. Find the 5 largest subdirectories with `du | sort -rh | head -5`.
5. Compare `du -sh .` against `df -h .` and explain what each measures.

---

## 23. free — memory usage

```bash
free [options]
```

```bash
free -h
```

```
               total        used        free      shared  buff/cache   available
Mem:           3.9Gi       222Mi       3.8Gi       4.9Mi        83Mi       3.7Gi
Swap:             0B          0B          0B
```

| Option | Does |
|---|---|
| `-h` | human-readable |
| `-m` / `-g` | megabytes / gigabytes |
| `-s N` | refresh every N seconds |

**Read the `available` column, not `free`.** Linux deliberately uses spare memory for disk cache (`buff/cache`), which it releases instantly when a program needs it. Low `free` is normal and healthy; low `available` is the real problem.

**`free` is Linux only.** On macOS use `vm_stat` or Activity Monitor.

### Tasks
1. Show memory usage in human-readable form.
2. Explain in a comment the difference between `free` and `available`.
3. Watch memory refresh every 2 seconds with `-s 2`, then Ctrl-C.
4. On macOS, run `vm_stat` and compare.

---

## 24. kill — signal processes

```bash
kill [-SIGNAL] PID
```

```bash
sleep 300 &
PID=$!
kill $PID
kill -9 $PID          # force
killall sleep         # by name
pkill -f "pattern"    # by command line pattern
```

```
started PID 568
  568 S    sleep
killed
```

| Signal | Number | Does |
|---|---|---|
| `SIGTERM` | 15 | **default** — polite, "please exit"; the program can clean up |
| `SIGKILL` | 9 | force — cannot be caught or ignored |
| `SIGINT` | 2 | what Ctrl-C sends |
| `SIGHUP` | 1 | terminal closed; often means "reload config" |
| `SIGSTOP` | 19 | pause; **cannot be caught** |
| `SIGCONT` | 18 | resume |

**Try `kill` before `kill -9`.** The default gives the program a chance to close files and save state. `-9` removes it instantly with no cleanup, which can corrupt data.

Job control in an interactive shell:

```bash
command &          # run in the background
jobs               # list background jobs
fg %1              # bring job 1 to the foreground
bg %1              # resume job 1 in the background
Ctrl-Z             # suspend the current job
$!                 # PID of the last background job
```

### Tasks
1. Start `sleep 300 &`, capture the PID with `$!`, and kill it.
2. Verify with `ps` that it is gone.
3. Start a job, suspend it with Ctrl-Z, list it with `jobs`, resume with `fg`.
4. Kill a process by name with `pkill`.
5. Send `SIGTERM` then `SIGKILL` to a process and note the difference.

---

## 25. File permissions — chmod, chown, chgrp

Reading `ls -l` output:

```
-rwxr-xr-x 1 root root 0 Aug 25 20:23 perm.sh
```

| Position | Meaning |
|---|---|
| `-` | type: `-` file, `d` directory, `l` symlink |
| `rwx` | **owner** can read, write, execute |
| `r-x` | **group** can read and execute |
| `r-x` | **others** can read and execute |

### chmod — change permissions

```bash
chmod [options] mode file
```

**Numeric mode:** each digit is owner, group, others. `r`=4, `w`=2, `x`=1, added together.

```bash
for m in 777 755 644 600 400; do chmod $m perm.sh; ls -l perm.sh; done
```

```
777 -> -rwxrwxrwx
755 -> -rwxr-xr-x
644 -> -rw-r--r--
600 -> -rw-------
400 -> -r--------
```

| Mode | Means | Use for |
|---|---|---|
| `755` | owner all, others read+execute | scripts, directories |
| `644` | owner read+write, others read | normal files |
| `600` | owner only | secrets, SSH keys |
| `700` | owner all, nobody else | private directories |
| `777` | everyone everything | **almost never — a security hole** |

**Symbolic mode:**

```bash
chmod +x script.sh              # add execute for everyone
chmod u+x script.sh             # add execute for the owner
chmod g-w file                  # remove write from the group
chmod u=rw,g=r,o= file          # set exactly
chmod -R 755 directory          # recursive
```

```
-rw-r--r--  (644, after chmod 644)
-rwxr-xr-x  (after chmod +x)
-rwxr-x---  (after chmod 750)
-rw-r-----  (after chmod u=rw,g=r,o=)
```

`u` owner, `g` group, `o` others, `a` all. `+` add, `-` remove, `=` set exactly.

**On a directory, `x` means "can enter it", not "can execute it".** A directory with `r` but no `x` lets you list names but not access anything inside.

### chown and chgrp — change ownership

```bash
chown user file
chown user:group file
chown -R user:group directory
chgrp group file
```

Both usually need `sudo` — you cannot give your files away to another user without it.

### umask

```bash
umask
```

```
0022
```

`umask` sets the default permissions for new files by **subtracting** from 666 (files) or 777 (directories). With `022`, new files are 644 and new directories 755.

### Special bits

```bash
ls -ld /tmp
```

```
drwxrwxrwt
```

That trailing `t` is the **sticky bit** — in a world-writable directory like `/tmp`, it means you can only delete your own files. `s` in the owner position is **setuid** (run as the file's owner), which is how `passwd` works.

### Tasks
1. Create a file and view its permissions with `ls -l`.
2. Make it executable with `chmod +x` and check again.
3. Set it to 644, 600 and 755 in turn, checking after each.
4. Convert `rwxr-x---` to its numeric form by hand, then verify with `chmod`.
5. Remove read permission from others and try to read it as another user.
6. Create a directory, remove `x` from it, and try to `cd` in.
7. Run `umask`, create a file, and confirm the permissions match the prediction.
8. Look at `ls -ld /tmp` and identify the sticky bit.

---

## 26. Networking — ping, curl, wget

> **Not tested here** — the sandbox blocks outbound network. The syntax is standard; run these yourself.

### ping — is a host reachable?

```bash
ping -c 4 google.com
ping -c 1 -W 1 8.8.8.8
```

| Option | Does |
|---|---|
| `-c N` | send N packets then stop (**without this it runs forever**) |
| `-W N` | timeout in seconds |
| `-i N` | interval between packets |

### curl — transfer data

```bash
curl https://api.example.com/data
curl -o file.json https://api.example.com/data
curl -O https://example.com/file.zip
curl -I https://example.com
curl -L https://example.com
curl -X POST -d '{"key":"value"}' -H "Content-Type: application/json" https://api.example.com
curl -s https://api.example.com | head
```

| Option | Does |
|---|---|
| `-o FILE` | save to a named file |
| `-O` | save using the remote filename |
| `-I` | headers only |
| `-L` | follow redirects |
| `-X` | HTTP method |
| `-d` | request body |
| `-H` | add a header |
| `-s` | silent — no progress bar |
| `-u user:pass` | basic auth |

### wget — download files

```bash
wget https://example.com/file.zip
wget -O name.zip https://example.com/file.zip
wget -c https://example.com/big.iso
wget -r -np https://example.com/dir/
```

| Option | Does |
|---|---|
| `-O FILE` | output filename |
| `-c` | continue an interrupted download |
| `-q` | quiet |
| `-r` | recursive |
| `-np` | do not ascend to the parent directory |

**curl vs wget:** `curl` is for APIs — it prints to stdout by default and speaks many protocols and methods. `wget` is for downloading files — it saves to disk by default and can recurse and resume.

### Tasks
1. Ping a host 4 times.
2. Fetch a public API with `curl` and pipe it through `head`.
3. Save a response to a file with `curl -o`.
4. Fetch only the headers with `curl -I`.
5. Download a file with `wget`.
6. Interrupt a download and resume it with `wget -c`.
7. Send a POST request with a JSON body.

---

## 27. Remote access — ssh, scp, rsync

> **Not tested here** — no remote host available. Syntax is standard.

### ssh — remote shell

```bash
ssh user@host
ssh -p 2222 user@host
ssh user@host 'ls -la'
ssh-keygen -t ed25519 -C "you@email"
ssh-copy-id user@host
```

| Option | Does |
|---|---|
| `-p N` | port (default 22) |
| `-i keyfile` | use a specific private key |
| `-v` | verbose — for debugging connection failures |

**Set up key auth once and stop typing passwords:**

```bash
ssh-keygen -t ed25519 -C "you@email"     # creates ~/.ssh/id_ed25519{,.pub}
ssh-copy-id user@host                     # installs the public key remotely
```

**`~/.ssh/config` saves enormous time:**

```
Host myvm
    HostName 193.219.x.x
    User mantas
    Port 2222
    IdentityFile ~/.ssh/id_ed25519
```

Then `ssh myvm` and `scp file myvm:~/`.

**Your private key must be mode 600.** SSH refuses to use a key that others can read.

### scp — copy over ssh

```bash
scp file.txt user@host:~/
scp user@host:~/file.txt .
scp -r localdir user@host:~/
scp -P 2222 file.txt user@host:~/
```

Note **`-P` uppercase** for the port in `scp`, but `-p` lowercase in `ssh`. This catches everyone.

### rsync — efficient sync

```bash
rsync -av source/ user@host:~/dest/
rsync -avz --delete source/ dest/
rsync -av --dry-run source/ dest/
rsync -av --exclude='*.log' source/ dest/
```

| Option | Does |
|---|---|
| `-a` | archive: recursive, preserve permissions, times, links |
| `-v` | verbose |
| `-z` | compress during transfer |
| `-n` / `--dry-run` | show what would happen, change nothing |
| `--delete` | remove files in the destination not in the source |
| `--exclude` | skip matching files |
| `-P` | progress bar and resume support |

**The trailing slash matters enormously:**

```bash
rsync -av src/ dest/      # copies the CONTENTS of src into dest
rsync -av src dest/       # copies the DIRECTORY src into dest, making dest/src
```

**`rsync` only transfers differences**, so a second run over a large tree is nearly instant. That is why it beats `scp -r` for anything repeated.

**Always `--dry-run` first when using `--delete`.**

### Tasks
1. Generate an SSH key pair.
2. Connect to a remote host (a VM or a free tier server).
3. Run a single remote command without opening a session.
4. Add a host to `~/.ssh/config` and connect by its alias.
5. Copy a file to the remote host with `scp`.
6. Copy a directory back with `scp -r`.
7. Sync a directory with `rsync -av --dry-run` and read the plan.
8. Run it for real, change one file, run again, and note how little transfers.

---

## 28. Scripting — variables and data types

```bash
#!/usr/bin/env bash
name="Mantas"
age=20
readonly PI=3.14159
```

**No spaces around `=`.** `name = "x"` tries to run a command called `name`.

```bash
name="Mantas"
echo "$name is $age, PI=$PI"
echo "braces: ${name}_suffix"
echo "default: ${missing:-fallback}"
echo "length: ${#name}"
echo "slice: ${name:0:3}"
echo "upper: ${name^^} lower: ${name,,}"
echo "replace: ${name/M/X}"
export EXPORTED="visible to children"
```

```
Mantas is 20, PI=3.14159
braces: Mantas_suffix
default: fallback
length: 6
slice: Man
upper: MANTAS lower: mantas
replace: Xantas
```

| Expansion | Does |
|---|---|
| `${var}` | explicit boundary |
| `${var:-default}` | use default if unset |
| `${var:=default}` | use **and assign** default |
| `${var:?message}` | error out if unset |
| `${#var}` | length |
| `${var:N:M}` | substring |
| `${var^^}` / `${var,,}` | upper / lower |
| `${var/old/new}` | replace first |
| `${var//old/new}` | replace all |
| `${var#prefix}` / `${var%suffix}` | strip |

### Special variables

```bash
echo "script=$0 argc=$# argv=$* pid=$$"
```

| Variable | Is |
|---|---|
| `$0` | script name |
| `$1`, `$2` | positional arguments |
| `$#` | argument count |
| `$@` | all arguments, **individually quoted** |
| `$*` | all arguments as one string |
| `$?` | exit code of the last command |
| `$$` | this script's PID |
| `$!` | PID of the last background job |

**Use `"$@"` not `"$*"`** when passing arguments through — `"$@"` preserves each argument as a separate word.

### Data types

Bash has **strings** and nothing else, unless you declare otherwise.

```bash
str="text"; num=42
declare -i typed=10
declare -a arr=(a b c)
declare -A map=([k1]=v1 [k2]=v2)
typed=typed+5
echo "typed int: $typed"
```

```
typed int: 15
```

| Declaration | Makes |
|---|---|
| `declare -i` | integer — arithmetic evaluates automatically |
| `declare -a` | indexed array |
| `declare -A` | associative array (bash 4+; **not on macOS's bash 3.2**) |
| `declare -r` | readonly |
| `local` | function-scoped (topic 30) |

### The quoting rule

**Always quote your variables: `"$var"`.** An unquoted variable containing spaces splits into multiple words and breaks everything. This causes more bash bugs than any other single mistake.

```bash
file="my document.txt"
rm $file            # ❌ tries to remove "my" and "document.txt"
rm "$file"          # ✅
```

### Tasks
1. Set three variables and print them in one string.
2. Try `name = "x"` with spaces. Read the error.
3. Use `${var:-default}` on an unset variable.
4. Print the length of a string with `${#var}`.
5. Extract a substring with `${var:0:3}`.
6. Uppercase a variable with `${var^^}`.
7. Print `$0`, `$#` and `$@` from a script called with three arguments.
8. Create a variable holding a filename with a space, and delete it unquoted then quoted.
9. Use `declare -i` and confirm arithmetic works without `$(( ))`.

---

## 29. Operators

**Arithmetic:** `+ - * / % **` inside `$(( ))`
**Numeric comparison:** `-eq -ne -gt -ge -lt -le`
**String comparison:** `= != < >`
**File tests:** `-f -d -e -r -w -x -s -L`
**Logical:** `&& || !`

```bash
a=7 b=2
echo "arith: $((a+b)) $((a-b)) $((a*b)) $((a/b)) $((a%b)) $((a**b))"
((a++)); echo "after a++: $a"
echo "compare nums: $([ 7 -gt 2 ] && echo yes)"
echo "compare strs: $([ "abc" = "abc" ] && echo equal)"
[[ "hello" == h* ]] && echo "glob match"
[[ "2026-08" =~ ^([0-9]{4})- ]] && echo "regex captured ${BASH_REMATCH[1]}"
[[ -f s.sh && -r s.sh ]] && echo "file exists and readable"
```

```
arith: 9 5 14 3 1 49
after a++: 8
compare nums: yes
compare strs: equal
glob match
regex captured 2026
file exists and readable
```

**Bash has no floating point.** `$((7/2))` is 3. For decimals use `bc` or `awk`:

```bash
echo "scale=2; 7/2" | bc          # 3.50
awk 'BEGIN {printf "%.2f\n", 7/2}'
```

### Numeric vs string comparison

```bash
[ "$a" -eq "$b" ]         # numeric
[ "$a" = "$b" ]           # string
(( a == b ))              # numeric, C-style — clearest
```

Using `-eq` on strings or `=` on numbers is a classic bug. `"10" = "9"` is false but `"10" -gt "9"` is true.

### File tests

| Test | True if |
|---|---|
| `-e file` | exists |
| `-f file` | is a regular file |
| `-d file` | is a directory |
| `-r` `-w` `-x` | readable / writable / executable |
| `-s file` | exists and is not empty |
| `-L file` | is a symlink |
| `file1 -nt file2` | newer than |

### `[` vs `[[`

| | `[` | `[[` |
|---|---|---|
| What it is | a **command** | a bash **keyword** |
| Unquoted empty variable | breaks | safe |
| `&&` `||` inside | no | yes |
| Regex `=~` | no | yes |
| Glob matching | no | yes |
| Portable to `sh` | yes | no |

**Use `[[ ]]` in bash scripts, `(( ))` for arithmetic.** Use `[ ]` only if the script must run under plain `sh`.

### Tasks
1. Compute the sum, product and remainder of two numbers with `$(( ))`.
2. Compute `7/2` and note it gives 3, then get 3.5 with `bc`.
3. Compare two numbers with `-gt` inside `[ ]`.
4. Compare two strings with `=`.
5. Compare `"10"` and `"9"` as strings and as numbers. Explain the difference.
6. Test whether a file exists, is readable and is non-empty.
7. Use `[[ =~ ]]` to extract a year from a date string via `BASH_REMATCH`.
8. Set a variable to empty, then compare it with `[ ]` unquoted and read the error. Fix with `[[ ]]`.

---

## 30. If / else and case

```bash
if condition; then
    ...
elif condition; then
    ...
else
    ...
fi
```

```bash
n=15
if (( n > 20 )); then echo "big"
elif (( n > 10 )); then echo "medium"
else echo "small"; fi

[[ -d /tmp ]] && echo "and: /tmp is a dir"
[[ -f /nope ]] || echo "or: /nope missing"

case "$n" in
  1|2) echo "low" ;;
  15)  echo "case matched 15" ;;
  *)   echo "default" ;;
esac
```

```
medium
and: /tmp is a dir
or: /nope missing
case matched 15
```

**`then` needs a `;` before it** if it is on the same line as `if`. `fi` closes the block — `if` spelled backwards.

`cmd && action` runs the action only if the command succeeded (exit code 0). `cmd || action` runs it only on failure. That is the compact form used everywhere in real scripts.

### case

```bash
case "$var" in
  pattern1)     commands ;;
  pat2|pat3)    commands ;;
  *.txt)        commands ;;      # globs work
  *)            default ;;
esac
```

`;;` ends each branch. `|` matches alternatives. `*)` is the default and should always be present.

### Tasks
1. Print whether a number is positive, negative or zero.
2. Check whether a file exists and print a message either way.
3. Use `&&` and `||` for a one-line existence check.
4. Write a `case` matching three specific values plus a default.
5. Use a glob pattern in a `case` branch to match `*.log`.
6. Nest an `if` inside a `case` branch.

---

## 31. Loops

### for

```bash
for i in 1 2 3; do printf "%s " "$i"; done; echo
for i in {1..5}; do printf "%s " "$i"; done; echo
for i in {0..10..2}; do printf "%s " "$i"; done; echo
for ((i=0; i<3; i++)); do printf "%s " "$i"; done; echo
for f in *.csv; do echo "glob: $f"; done
arr=(x y z); for e in "${arr[@]}"; do printf "%s " "$e"; done; echo
declare -A m=([a]=1 [b]=2); for k in "${!m[@]}"; do printf "%s=%s " "$k" "${m[$k]}"; done; echo
```

```
1 2 3 
1 2 3 4 5 
0 2 4 6 8 10 
0 1 2 
glob: data.csv
x y z 
b=2 a=1 
```

### while and until

```bash
i=0; while (( i < 3 )); do printf "w%s " "$i"; ((i++)); done; echo
i=0; until (( i >= 3 )); do printf "u%s " "$i"; ((i++)); done; echo
```

```
w0 w1 w2 
u0 u1 u2 
```

`until` is `while` with the condition inverted. Bash has no `do...while`.

### Reading a file line by line

```bash
while IFS=, read -r id nm dept sal; do
    echo "read: $nm ($dept)"
done < <(tail -n +2 data.csv | head -2)
```

```
read: Mantas (IT)
read: Ona (Sales)
```

**`while IFS= read -r line; do ... done < file` is the correct way to read a file line by line.** `IFS=` stops whitespace being stripped, `-r` stops backslashes being interpreted. Setting `IFS=,` splits each line into fields automatically.

**Never `for line in $(cat file)`** — it splits on every space, not every newline.

### break and continue

```bash
for i in {1..10}; do
    (( i == 3 )) && continue
    (( i == 5 )) && break
    printf "%s " "$i"
done; echo
```

```
1 2 4 
```

### Tasks
1. Loop over the numbers 1 to 10 with a range.
2. Loop over even numbers with `{0..20..2}`.
3. Loop over all `.txt` files in a directory with a glob.
4. Loop over an array with `"${arr[@]}"`.
5. Loop over an associative array's keys with `"${!map[@]}"`.
6. Write a `while` loop that counts down from 5.
7. Write the same with `until`.
8. Read a CSV line by line with `while IFS=, read -r`.
9. Use `continue` to skip multiples of 3 and `break` at 8.
10. Write `for line in $(cat file)` on a file with spaces and watch it break.

---

## 32. Functions

```bash
name() {
    commands
}
```

```bash
greet() { echo "Hello, ${1:-world}"; }
add() { echo $(( $1 + $2 )); }
check() { [[ -f "$1" ]] && return 0 || return 1; }
countargs() { echo "got $# args: $*"; }
local_demo() { local hidden="inside"; echo "$hidden"; }

greet; greet "Mantas"
sum=$(add 3 4); echo "add returns via echo: $sum"
check data.csv && echo "check: exit code 0 = success"
countargs a b c
local_demo; echo "outside sees: ${hidden:-nothing}"
```

```
Hello, world
Hello, Mantas
add returns via echo: 7
check: exit code 0 = success
got 3 args: a b c
inside
outside sees: nothing
```

Key rules:

- **Arguments are `$1`, `$2`, `$@`** — the same as script arguments, not named parameters.
- **`return` sets an exit code (0–255), it does not return a value.** To return data, `echo` it and capture with `$(func)`.
- **`local` makes a variable function-scoped.** Without it, every variable is global and recursive functions corrupt their own callers.
- Define a function before you call it.

### Tasks
1. Write a function that prints a greeting with a default argument.
2. Write one that adds two numbers and returns via `echo`.
3. Capture that result into a variable with `$( )`.
4. Write a function returning exit code 0 or 1, and test it with `&&`.
5. Print `$#` and `$@` from inside a function.
6. Declare a variable with `local`, then try to read it outside.
7. Remove `local` and observe the variable leaking.
8. Write a recursive countdown function.

---

## 33. Arrays

```bash
arr=(a b c)
declare -A map=([k1]=v1 [k2]=v2)
```

```bash
declare -a arr=(a b c)
declare -A map=([k1]=v1 [k2]=v2)

echo "array: ${arr[@]} len=${#arr[@]} first=${arr[0]} last=${arr[-1]}"
arr+=(d); echo "after append: ${arr[@]}"
echo "indices: ${!arr[@]}"
echo "assoc: ${map[k1]} keys=${!map[@]}"
echo "slice arr: ${arr[@]:1:2}"
```

```
array: a b c len=3 first=a last=c
after append: a b c d
indices: 0 1 2 3
assoc: v1 keys=k1 k2
slice arr: b c
```

| Expression | Gives |
|---|---|
| `${arr[@]}` | all elements |
| `${arr[i]}` | element i (0-based) |
| `${arr[-1]}` | last element |
| `${#arr[@]}` | length |
| `${!arr[@]}` | all indices (or keys) |
| `${arr[@]:i:n}` | slice |
| `arr+=(x)` | append |
| `unset arr[i]` | remove an element |

**Always quote `"${arr[@]}"` when looping** — unquoted, elements containing spaces split apart.

**Associative arrays need bash 4+.** macOS ships bash 3.2, so `declare -A` fails there unless you installed a newer bash.

Associative arrays are how you count things:

```bash
declare -A count
for word in apple pear apple; do (( count[$word]++ )); done
for k in "${!count[@]}"; do echo "$k: ${count[$k]}"; done
```

That replaces `sort | uniq -c` entirely, in pure bash.

### Tasks
1. Create an array of 5 names and print them all.
2. Print its length and the first and last elements.
3. Append an element and print again.
4. Loop over the array with `"${arr[@]}"`.
5. Loop over indices with `"${!arr[@]}"`.
6. Slice the middle three elements.
7. Create an associative array of three key/value pairs and loop over its keys.
8. Count word frequency in a sentence using an associative array.
9. Create an array with an element containing a space, loop unquoted, and watch it split.

---

## 34. Writing a real script

```bash
#!/usr/bin/env bash
set -euo pipefail

usage() { printf 'Usage: %s [-v] [-o FILE] INPUT\n' "${0##*/}"; }

verbose=0; out=""
while getopts ':vo:h' opt; do
  case $opt in
    v) verbose=1 ;;
    o) out=$OPTARG ;;
    h) usage; exit 0 ;;
    :) echo "error: -$OPTARG needs an argument" >&2; exit 2 ;;
    \?) echo "error: unknown option -$OPTARG" >&2; exit 2 ;;
  esac
done
shift $(( OPTIND - 1 ))

input=${1:-}
[[ -z $input ]] && { echo "error: no input" >&2; usage >&2; exit 2; }

(( verbose )) && echo "verbose on, out=${out:-stdout}"
echo "processing $input"

trap 'echo "cleanup ran"' EXIT
exit 0
```

```
--- normal ---
processing data.csv
cleanup ran
--- with flags ---
verbose on, out=result.txt
processing data.csv
cleanup ran
--- errors ---
error: no input
Usage: f.sh [-v] [-o FILE] INPUT
error: unknown option -z
```

### The shebang

```bash
#!/usr/bin/env bash        # finds bash on PATH — portable
#!/bin/bash                # hardcoded path
```

`env` is better because bash lives in different places on different systems (`/bin/bash` on Linux, `/opt/homebrew/bin/bash` for Homebrew's on macOS).

### `set -euo pipefail`

| Flag | Does |
|---|---|
| `-e` | exit immediately if any command fails |
| `-u` | error on an undefined variable |
| `-o pipefail` | a pipeline fails if **any** stage fails, not just the last |

**Put this at the top of every script.** Without it, a failing command is ignored and the script carries on doing damage.

### getopts

The leading `:` in `':vo:h'` enables silent error reporting, which gives you the `:` and `\?` cases. A `:` after a letter means that option takes an argument.

### Exit codes and redirection

```bash
true;  echo "exit of true: $?"       # 0
false; echo "exit of false: $?"      # 1

echo "stdout" > o.txt                # redirect stdout, overwrite
echo "more" >> o.txt                 # append
ls nope 2>/dev/null                  # discard stderr
{ echo out; echo err >&2; } > both.txt 2>&1     # both to one file
echo "hello" | tr 'a-z' 'A-Z'        # pipe
```

```
exit of true: 0
exit of false: 1
out
err
HELLO
```

| Symbol | Does |
|---|---|
| `>` | stdout to a file, overwriting |
| `>>` | stdout to a file, appending |
| `2>` | stderr |
| `&>` or `> f 2>&1` | both |
| `<` | read from a file |
| `\|` | pipe stdout into the next command |
| `/dev/null` | discard |

**Exit code 0 means success.** Anything else is failure. `$?` holds the last one.

### trap

```bash
trap 'rm -f "$tmpfile"' EXIT        # cleanup on any exit
trap 'echo interrupted' INT         # on Ctrl-C
```

`trap ... EXIT` is the bash equivalent of `finally` — it runs whether the script succeeds, fails or is interrupted.

### Tasks
1. Write a script with a shebang and make it executable.
2. Add `set -euo pipefail` and confirm a failing command stops it.
3. Reference an undefined variable with `-u` and read the error.
4. Add a `usage()` function and a `-h` flag.
5. Parse `-v` and `-o FILE` with `getopts`.
6. Send errors to stderr with `>&2` and exit with code 2.
7. Redirect stdout and stderr to separate files.
8. Add a `trap ... EXIT` that removes a temp file, then exit early and confirm it ran.
9. Check `$?` after a successful and a failing command.

---

## 35. cron — scheduled jobs

> **Not tested here** — cron was not installed in the sandbox. Syntax is standard.

```bash
crontab -e          # edit your crontab
crontab -l          # list it
crontab -r          # remove it (careful — no confirmation)
```

### The five fields

```
* * * * * command
│ │ │ │ │
│ │ │ │ └─ day of week (0-7, both 0 and 7 are Sunday)
│ │ │ └─── month (1-12)
│ │ └───── day of month (1-31)
│ └─────── hour (0-23)
└───────── minute (0-59)
```

| Schedule | Means |
|---|---|
| `* * * * *` | every minute |
| `0 * * * *` | every hour, on the hour |
| `0 3 * * *` | every day at 03:00 |
| `*/15 * * * *` | every 15 minutes |
| `0 9 * * 1-5` | 09:00, Monday to Friday |
| `0 0 1 * *` | midnight on the 1st of each month |
| `30 2 * * 0` | 02:30 every Sunday |

Shortcuts: `@reboot`, `@daily`, `@hourly`, `@weekly`, `@monthly`.

### Examples

```bash
0 3 * * * /home/mantas/backup.sh >> /var/log/backup.log 2>&1
*/5 * * * * /usr/local/bin/check.sh
@reboot /home/mantas/startup.sh
```

### The four things that break cron jobs

1. **Cron has almost no `PATH`.** `python3` or `docker` will not be found. **Use absolute paths for everything**, or set `PATH=` at the top of the crontab.
2. **No environment.** Your `~/.bashrc` is not sourced, so aliases, `nvm`, `pyenv` and exported variables do not exist.
3. **Output goes to email, which usually is not configured, so it vanishes.** Always redirect: `>> /path/log 2>&1`.
4. **`%` is special in crontabs** and must be escaped as `\%`. This breaks `date +%Y-%m-%d` silently.

The debugging routine: run the exact command from the crontab manually first, with an empty environment:

```bash
env -i /bin/bash --noprofile --norc -c '/full/path/to/script.sh'
```

If it works there, it will work in cron.

On macOS, cron still exists but `launchd` is the modern equivalent, and Full Disk Access permissions can block cron jobs silently.

### Tasks
1. List your current crontab.
2. Add a job that appends the date to a file every minute. Watch it run, then remove it.
3. Write the schedule for "every weekday at 08:30".
4. Write the schedule for "every 10 minutes".
5. Write a job that redirects both stdout and stderr to a log file.
6. Write a script that calls a command without an absolute path, schedule it, and watch it fail. Fix it.
7. Use `@reboot` to run something at startup.

---

## FINAL PROJECT — Log analysis and system report tool

Only start once every task above is done.

Build a bash script `sysreport.sh` that analyses a log file and reports on the system.

### Requirements

**Script structure** (34)
- `#!/usr/bin/env bash` and `set -euo pipefail`
- A `usage()` function printing help
- `getopts` handling `-f LOGFILE`, `-o OUTPUT`, `-n TOP_N`, `-v` verbose, `-h` help
- Errors to stderr with a non-zero exit code
- `trap` cleaning up any temp files on exit

**Variables and arrays** (28, 33)
- Store configuration in variables at the top
- Use an indexed array for the report sections
- Use an **associative array** to count occurrences by category
- Quote every variable expansion

**Conditionals and loops** (30, 31)
- Validate that the log file exists, is readable and is not empty
- `case` to handle different log severity levels
- `while IFS= read -r line` to process the log line by line
- `for` loop over the report sections

**Functions** (32)
- `log_info`, `log_error` writing to stderr with a timestamp
- `check_deps` verifying required commands exist with `command -v`
- `analyse_log` doing the parsing
- `system_report` gathering system stats
- Every function uses `local` for its variables

**Text processing** (14–19)
- `grep -c` to count errors, warnings and info lines
- `awk` to compute the average of a numeric column and group by a field
- `sed` to normalise timestamps or strip prefixes
- `cut` to extract specific fields
- `sort | uniq -c | sort -rn | head -N` for the top N most frequent messages

**System information** (20–24)
- `df -h` for disk usage, flagging any filesystem over 80%
- `du -sh` for the size of the log directory
- `free -h` for memory (guard it — it does not exist on macOS)
- `uptime` for load average
- `ps aux --sort=-%mem | head -6` for the top memory consumers

**File permissions** (25)
- `chmod 755` the script itself
- `chmod 644` the generated report
- Check the log file is readable before processing and exit cleanly if not

**Output**
- A formatted report using `printf` with aligned columns
- Written to the file given by `-o`, defaulting to stdout
- Sections separated by header lines

**Scheduling** (35)
- A commented crontab line at the bottom of the script showing how to run it daily at 03:00
- Absolute paths and output redirection in that line

### Test data

Generate a log file to work against:

```bash
for i in {1..200}; do
    lvl=$(shuf -e ERROR WARN INFO INFO INFO -n1)
    printf '%s %s module%d took %dms\n' \
        "$(date -d "-$i minutes" '+%Y-%m-%d %H:%M:%S' 2>/dev/null || date '+%Y-%m-%d %H:%M:%S')" \
        "$lvl" $((RANDOM % 5)) $((RANDOM % 500))
done > app.log
```

### Done when
- `./sysreport.sh -h` prints usage and exits 0
- `./sysreport.sh` with no arguments prints an error to stderr and exits non-zero
- `./sysreport.sh -f app.log -n 5 -v` produces a full report
- A missing or unreadable log file is handled without a crash
- The report shows counts per severity, the top 5 messages, average duration, and system stats
- The temp file is removed even if you Ctrl-C halfway
- You can add a new report section by writing one function and adding one array entry
- `bash -n sysreport.sh` reports no syntax errors
- `shellcheck sysreport.sh` is clean, or every warning has a justifying comment
