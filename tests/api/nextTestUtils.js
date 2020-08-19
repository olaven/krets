import http from 'http'
import listen from 'test-listen'
import { apiResolver } from 'next/dist/next-server/server/api-utils'
import { Server } from "net";
import { NextApiHandler } from "next";
import * as faker from "faker";
import fetch from "cross-fetch";
import { PageModel, CategoryModel, PaginatedModel } from '../../src/models/models';

import spawn from 'cross-spawn'
import _pkg from 'next/package.json'
import path from 'path'

//NOTE: copied from https://github.com/vercel/next.js/blob/canary/test/lib/next-test-utils.js
function runNextCommandDev(argv, stdOut, opts = {}) {
    const cwd = path.dirname(require.resolve('next/package'))
    const env = {
        ...process.env,
        NODE_ENV: undefined,
        __NEXT_TEST_MODE: 'true',
        ...opts.env,
    }

    return new Promise((resolve, reject) => {
        const instance = spawn(
            'node',
            ['--no-deprecation', 'dist/bin/next', ...argv],
            { cwd, env }
        )
        let didResolve = false

        function handleStdout(data) {
            const message = data.toString()
            const bootupMarkers = {
                dev: /compiled successfully/i,
                start: /started server/i,
            }
            if (
                bootupMarkers[opts.nextStart || stdOut ? 'start' : 'dev'].test(message)
            ) {
                if (!didResolve) {
                    didResolve = true
                    resolve(stdOut ? message : instance)
                }
            }

            if (typeof opts.onStdout === 'function') {
                opts.onStdout(message)
            }

            if (opts.stdout !== false) {
                process.stdout.write(message)
            }
        }

        function handleStderr(data) {
            const message = data.toString()
            if (typeof opts.onStderr === 'function') {
                opts.onStderr(message)
            }

            if (opts.stderr !== false) {
                process.stderr.write(message)
            }
        }

        instance.stdout.on('data', handleStdout)
        instance.stderr.on('data', handleStderr)

        instance.on('close', () => {
            instance.stdout.removeListener('data', handleStdout)
            instance.stderr.removeListener('data', handleStderr)
            if (!didResolve) {
                didResolve = true
                resolve()
            }
        })

        instance.on('error', (err) => {
            reject(err)
        })
    })
}
