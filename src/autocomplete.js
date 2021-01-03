import { popperGenerator, defaultModifiers } from "@popperjs/core/lib/popper-lite"
import flip from "@popperjs/core/lib/modifiers/flip"
import preventOverflow from "@popperjs/core/lib/modifiers/preventOverflow"

const createPopper = popperGenerator({
  defaultModifiers: [...defaultModifiers, flip, preventOverflow],
})

const entityMap = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;",
}

function escape(string) {
  return string.replace(/[&<>"']/g, function (s) {
    return entityMap[s]
  })
}

function template(html) {
  // Create a node from string.
  const template = document.createElement("template")
  template.innerHTML = html.trim()
  return template.content.firstChild
}

function escapeRegExChars(value) {
  return value.replace(/[|\\{}()[\]^$+*?.]/g, "\\$&")
}

function highlight(suggestion, value) {
  /**
   *  highlight function source:
   *  Ajax Autocomplete for jQuery, version 1.4.11
   *  (c) 2017 Tomas Kirda
   *  https://github.com/devbridge/jQuery-Autocomplete
   *  MIT
   */

  if (!value) {
    return escape(suggestion)
  }

  const pattern = "(" + escapeRegExChars(value) + ")"

  return escape(
    suggestion.replace(new RegExp(pattern, "gi"), "<mark>$1</mark>")
  ).replace(/&lt;(\/?mark)&gt;/g, "<$1>")
}

class AutoComplete {
  constructor(options) {
    this.input = options.input
    this.lookup = options.lookup // Takes name, returns a Promise that resolves into a list of {name, value}s.
    this.onSelect = options.onSelect // Takes value.
    this.silent = options.silent === true // Set this to true to disable no suggestions notice.
    this.highlight = options.highlight === true // Set this true to enable highlighting
    this.cache = options.cache === true // Set this true to enable caching
    this.noResultsMessage = options.noResultsMessage || "-- no corresponding results --"

    this.cachedResults = []
    this.emptyResults = []

    this.popper = null
    this.selected = null
    this.showing = false

    const templateID = `id_${this.input.id}`
    this.template = template(
      `<ul role="listbox" class="autocomplete" id="${templateID}"></ul>`
    )
    this.input.parentNode.append(this.template)

    this.input.setAttribute("autocomplete", "off")
    this.input.setAttribute("role", "combobox")
    this.input.setAttribute("aria-owns", templateID)
    this.input.setAttribute("aria-autocomplete", "list")
    this.input.setAttribute("aria-expanded", "false")

    this.input.addEventListener("input", () => {
      const name = this.input.value.trim()
      this.selected = null

      if (name) {
        this.suggest(name)
      } else {
        if (this.showing) {
          this.destroy()
        }
      }
    })

    this.input.addEventListener("focusout", () => {
      setTimeout(() => {
        this.destroy()
      }, 200)
    })

    this.input.addEventListener("keydown", event => {
      if (!["ArrowUp", "ArrowDown", "Escape", "Enter", "Tab"].includes(event.key)) {
        return
      }

      const changeSelected = ["ArrowUp", "ArrowDown"].includes(event.key)

      // Remove selected class from previously selected item.
      changeSelected &&
        this.selected &&
        this.selected.classList.remove("selected", "mouseover")

      switch (event.key) {
        case "ArrowUp": {
          const last = this.template.lastChild
          this.selected = this.selected
            ? this.selected.previousElementSibling || last
            : last
          if (!this.selected.classList.contains("no-results")) {
            event.preventDefault() // Prevents cursor from moving to beginning of the input.
          }
          break
        }

        case "ArrowDown": {
          const first = this.template.firstChild
          this.selected = this.selected
            ? this.selected.nextElementSibling || first
            : first
          break
        }

        case "Escape": {
          this.destroy()
          break
        }

        case "Enter": {
          if (this.selected && !this.selected.classList.contains("mouseover")) {
            event.preventDefault() // Prevents form submit.
            this.triggerOnSelect(this.selected)
          }
          break
        }

        case "Tab": {
          if (this.selected && !event.shiftKey) {
            this.input.value = this.selected.textContent
          }
          break
        }
      }

      if (
        changeSelected &&
        this.selected &&
        !this.selected.classList.contains("no-results")
      ) {
        this.selected.classList.add("selected")
        this.input.value = this.selected.textContent
        this.input.setAttribute("aria-activedescendant", this.selected.id)
      }
    })

    this.template.addEventListener("click", event => {
      event.stopPropagation()
      this.triggerOnSelect(event.target.closest("li"))
    })

    this.template.addEventListener("mouseover", event => {
      if (
        event.target.tagName === "LI" &&
        !event.target.classList.contains("no-results")
      ) {
        Array.from(this.template.childNodes).forEach(
          el => el !== event.target && el.classList.remove("selected", "mouseover")
        )
        this.selected = event.target
        this.selected.classList.add("selected", "mouseover")
      }
    })
  }

  suggest(name) {
    if (this.cache) {
      const isEmptyResult = this.emptyResults.filter(result =>
        name.startsWith(Object.keys(result)[0])
      ).length

      if (isEmptyResult) {
        this.render([])
        return
      }

      const [items] = this.cachedResults.filter(result => result[name])

      if (items) {
        this.render(items[name])
        return
      }
    }

    this.lookup(name).then(suggestions => {
      const items = suggestions.map(s => ({
        name: this.highlight ? highlight(s.name, name) : escape(s.name),
        value: escape(s.value),
      }))

      if (this.cache) {
        const resultSet = items.length ? this.cachedResults : this.emptyResults
        resultSet.push({ [name]: items })
      }

      this.render(items)
    })
  }

  render(items) {
    if (!this.popper) {
      this.popper = this.create()
    }

    if (items.length) {
      this.template.innerHTML = ""
      for (const [index, item] of items.entries()) {
        this.template.innerHTML += `<li role="option" data-value="${item.value}" id="cb-opt-${index}">${item.name}</li>`
      }
    } else {
      if (this.silent) {
        this.destroy()
        return
      }

      if (!this.template.querySelector(".no-results")) {
        this.template.innerHTML = `<li role="alert" aria-live="assertive" class='no-results'>${this.noResultsMessage}</li>`
      }
    }

    this.showing = true
    this.template.style.display = "block"
    this.input.setAttribute("aria-expanded", "true")
  }

  destroy() {
    if (this.popper) {
      this.input.setAttribute("aria-expanded", "false")
      this.template.style.display = "none"
      this.template.innerHTML = ""
      this.selected = null
      this.showing = false
      this.popper.destroy()
      this.popper = null
    }
  }

  create() {
    return createPopper(this.input, this.template, {
      placement: "bottom-start",
    })
  }

  triggerOnSelect(selected) {
    if (selected.classList.contains("no-results")) {
      return
    }

    this.destroy()
    this.input.value = selected.textContent
    const value = selected.getAttribute("data-value")
    value && this.onSelect && this.onSelect(value)
  }
}

/* global globalThis */
globalThis.AutoComplete = AutoComplete
