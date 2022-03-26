export class Keyboard {

    private static readonly listenedKeys: Map<string, boolean> = new Map()
    private static readonly pressedKeys: Map<string, boolean> = new Map()

    public static initialize(view: HTMLCanvasElement) {
        view.setAttribute('tabindex', '1')
        view.addEventListener('keydown', Keyboard.onKeyDown)
        view.addEventListener('keyup', Keyboard.onKeyUp)
    }

    private static onKeyDown = (e: KeyboardEvent): void => {
        if (Keyboard.listenedKeys.get(e.code)) {
            Keyboard.pressedKeys.set(e.code, true)
            e.preventDefault()
        }
    }

    private static onKeyUp = (e: KeyboardEvent): void => {
        if (Keyboard.listenedKeys.get(e.code)) {
            Keyboard.pressedKeys.set(e.code, false)
            e.preventDefault()
        }
    }

    public static clearListenedKeys = (): void => Keyboard.listenedKeys.clear()

    public static listenFor = (code: string) => Keyboard.listenedKeys.set(code, true)

    public static isPressed = (code: string): boolean => Keyboard.pressedKeys.get(code) || false
}