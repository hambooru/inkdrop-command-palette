###### I have been busy a lot lately hence this repository is marked as inactive and stale, please wait for the proper implementation or fork this repository.

# inkdrop command palette

A VSCode-like command palette for Inkdrop. (Invoke using `Ctrl+K`)

https://my.inkdrop.app/plugins/command-palette

> 💡 You may need to reload Inkdrop for this plugin to work. `Ctrl` + `Alt` + `R`

![Inkdrop_logbdEi1qT](https://user-images.githubusercontent.com/53419401/186372300-eadccb9e-5acb-4771-ac1c-1d46728ce75a.gif)

## Features

- Access and Invoke almost any command in Inkdrop.
- Filter commands by `.` for Formatting Commands and by `>` for application commands.
- Know which keyboard shortcuts are associated per command[^1].
- Search every command[^2] in Inkdrop.
- Extensible and easily configurable for plugin developers.

## Install

```css
ipm install command-palette
```

## Keybindings

| Command               | Explanation                     | Keybind |
| --------------------- | ------------------------------- | ------- |
| commandpalette:toggle | Shows/Hides the Command Palette | Ctrl+K  |

#### add it to your keymap.cson

```js
'body':
    'ctrl-k': 'commandpalette:toggle'
```

## Changelog

#### 1.0.0 - 08/24/2022

- Initial release, yay!

## Ideas

- [ ] configurable settings? I don't know what to put here though...

## Todo

- [ ] ability to use commands that require an argument, **requires a bit of reverse engineering**
- [ ] finalize decision on whether i should isolate commands such as `focus on ****` because we'd be already focusing on it or have another command invokable related to it that works targeted by the selector[^3].
- [ ] code documentation/prettify to make it less stressful on the eyes.
- [ ] find a way to make commands that rely on native stuff target the proper selector, as of now i could only rule this as a javascript DOM limitation (still researching on it though!)

###### 1: Current version is limited to only default keybindings, planned support for user defined `keymaps.cson` is in the works.

###### 2: Provided that the plugin developer provides support for their command via `lib/commands/plugins.js`

###### 3: For now, if you search for a command like that, it won't show anything but it's always visible on the full list, oh and you can't invoke it either.
