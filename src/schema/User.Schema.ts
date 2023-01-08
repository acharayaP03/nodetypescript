import { object, string, TypeOf} from "zod";

/**
 * validate user input during creation of user schema
 */

export const createUserSchema = object({
    body: object({
        name: string({
            required_error: "User name is required"
        }),
        password: string({
            required_error: "password is required"
        }).min(6, 'Password is too short, - should be at least 6'),
        passwordConfirmation: string({
            required_error: "password confirmation is required"
        }),
        email: string({
            required_error: "Email is required."
        }).email('Not a valid email.'),
    }).refine((data) => data.password === data.passwordConfirmation, {
        message: "Password do not match",
        path: ['passwordConfirmation']
    })
})

/**
 * Since we do not need password confirmation, we can omit it from body
 */
export type CreateUserInput = Omit<TypeOf<typeof createUserSchema>, "body.passwordConfirmation">