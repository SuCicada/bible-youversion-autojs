// export interface OutputChannel {
//     readonly name: string;
//     append(value: string): void;
//     appendLine(value: string): void;
//     replace(value: string): void;
//     clear(): void;
//     show(preserveFocus?: boolean): void;
//     hide(): void;
//     dispose(): void;
// }
export function createOutputChannel(name: string): OutputChannel {
    return new OutputChannel(name);
}
export class OutputChannel {
    private output: string = "";
    public readonly name: string;

    constructor(name: string) {
        this.name = name;
    }

    append(value: string): void {
        if (value) {
            this.output += value;
        }
    }

    appendLine(value: string): void {
        if (value) {
            this.output += value + "\n";
        } else {
            this.output += "\n";
        }
    }

    replace(value: string): void {
        if (value) {
            this.output = value;
        }
    }

    clear(): void {
        this.output = "";
    }

    show(preserveFocus?: boolean): void {
        console.log(this.output);
        if (!preserveFocus) {
            // focus logic if needed
        }
    }

    hide(): void {
        // hide logic if applicable
    }

    dispose(): void {
        // dispose resources if any
    }
}
