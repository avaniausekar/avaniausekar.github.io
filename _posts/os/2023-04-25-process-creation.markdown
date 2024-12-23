---
layout: single
title:  "Creating Processes"
date:   2023-04-25 09:30:45 +0530
categories: 
    - operating systems
tags:
    - os
    - fork
    - process creation
toc: true
---
In this article I have tried to explain the important things that happen during a process creation. I always had doubts about 
- How a process is created in OS ?
- From where does it all start ?
- What happens when you start a process ? 
- What exactly is fork and exec ? 

Let us see.

### Process Heirarchy

*Every process in Linux lives in a “process tree”. You can see that tree by running `pstree` in terminal. The root of the tree is init, with PID 1. Every process (except init) has a parent, and any process has many children.*

### Fork() System Call

*The `fork()` system call is used to create a new process.The new process created by fork is called the child process.This function is called once but returns twice. The only difference in the returns is that the return value in the child is 0, whereas the return value in the parent is the process ID of the new child.The child - the process that is created is an (almost) exact copy of the calling process.*

### Exec() System Call 
(Load into memory and then execute)

*Fork creates a new process which is a clone of itself, but what if we want to change the course of the process? Then we use `exec()` syscall. Exec() replaces the current process — its text, data, heap, and stack segments — with a brand-new program from disk.*

### On Boot Up

*On boot the kernel starts the init process, which then forks and execs the systems boot scripts. These fork and exec more programs, eventually ending up forking a login process.This is also known as process spawning which is carried out by these two systemcalls [fork & exec] in the background.*

----
****
Example code snippet of `fork()` and `exec()` in a C program:

{% highlight ruby %}
int pid = fork();
// now I am split in two! aaaaugh!
// who am I? I could be either the child or the parent
if (pid == 0) {
    // ok I am the child process
    // ls will take over and I will be a totally different process 
    exec(["ls"])
} else if (pid == -1) {
    // omg fork failed -- this is a disaster :(
} else {
    // ok i am the parent
    // continue my business being a cool program
    // I could wait for the child to finish if I want
}
{% endhighlight %}

----
****
Now, if I want to start a process called `ls` to list all the files in a directory.
The process starts out like this:

{% highlight ruby %}
my parent
     |- me 
{% endhighlight %}

When I run `fork()`, a child is created which is a clone of myself.

{% highlight ruby %}
my parent
     |- me 
         |-- clone of me
{% endhighlight %}

Then my clone calls `exec()` that is, my child runs `exec("ls")`. That leaves us with

{% highlight ruby %}
my parent
     |- me 
         |-- ls
{% endhighlight %}

Once `ls` exits I will be all alone by myself.(Almost)

{% highlight ruby %}
my parent
     |- me 
         |-- ls(zombie)
{% endhighlight %}

At this point `ls` is actually a zombie process! That means it’s dead, but it’s waiting around for the parent in case the parent wants to check on its (child's) return value (using the wait system call.) Once I get its return value, I will really be all alone again.

{% highlight ruby %}
my parent
     |- me 
{% endhighlight %}

----
****
The following paragraph from *Operating Systems:Three Easy Pieces* sums up the gist of the article:

>The fork() system call is strange; its partner in crime, exec(), is not
so normal either. What it does: given the name of an executable (e.g., wc),
and some arguments (e.g., p3.c), it loads code (and static data) from that
executable and overwrites its current code segment (and current static
data) with it; the heap and stack and other parts of the memory space of
the program are re-initialized. Then the OS simply runs that program,
passing in any arguments as the argv of that process. Thus, it does not
create a new process; rather, it transforms the currently running program
(formerly p3) into a different running program (wc). After the exec()
in the child, it is almost as if p3.c never ran; a successful call to exec()
never returns.
>

----
### References:

*Remzi H. Arpaci-Dusseau_ Andrea C Arpaci-Dusseau - Operating Systems- Three Easy Pieces*

Got this awesome concept from *Julia Evans* blog