export const dedent = (strings: TemplateStringsArray, ...values: string[]): string => {
    const raw = typeof strings === 'string' ? [strings] : strings.raw;

    let result = '';
    // first, perform interpolation
    // eslint-disable-next-line no-loops/no-loops
    for (let i = 0; i < raw.length; i++) {
        result += raw[i]
            // join lines when there is a suppressed newline
            .replace(/\\\n[ \t]*/g, '')
            // handle escaped backticks
            .replace(/\\`/g, '`');

        if (i < values.length) {
            result += values[i];
        }
    }

    // now strip indentation
    const lines = result.split('\n');
    let mindent: number | null = null;
    lines.forEach(l => {
        const m = l.match(/^(\s+)\S+/);
        if (m) {
            const indent = m[1].length;
            mindent = (!mindent) ? indent : Math.min(mindent, indent);
        }
    });

    if (mindent !== null) {
        const m = mindent; // appease Flow
        result = lines.map(l => l.startsWith(' ') ? l.slice(m) : l).join('\n');
    }

    return result
        // dedent eats leading and trailing whitespace too
        .trim()
        // handle escaped newlines at the end to ensure they don't get stripped too
        .replace(/\\n/g, '\n');
};
