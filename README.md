# mondo
A tool to build web-based presentations in the Socratic style


# HOW?

0. Clone this repo into a throwaway directory in your project

```
$ git clone https://github.com/pzel/mondo.git _mondo
```

1. Write a markdown file in the following format:

```
$ cat ./preso.qa
Q:
This is a question. All markdown is legal within the question, up to the next line with just
"A:"
on it.

A:
This is an answer. All markdown is legal within the answer, up to the next line with just
"Q:"
on it.
```

2. Make a footer file:

```
$ cat ./footer.html
<span>&copy; 2017 Myself</span>
$
```

3. Build your presentation:

```
$ _mondo/build ./preso.qa ./footer.html 'This is the title' > preso.html

```

4. Enjoy! Fork, hack and teach!


