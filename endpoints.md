# Planned endpoints

### `/api/account` Account specific endpoints

- `/login`
> **POST**
>
> Expects a `username` and `password` string.
>
> Will attempt to find or create a token for the user.
>
> If successful, will return `token` and `account_id` for caching/auth.

- `/logout`
> **POST**
>
> Needs a token in header `X-Authorization`
>
> Will attempt to reset the token of the user.

- `/[id]`
> **GET**
>
> Will return the user data for a specified account `id`.

- `/create`
> **POST**
>
> Will attempt to create a new account with `username` and `password` provided.
>
> Will return a user id if successful.

### `/tournament` Tournament specific endpoints

- `/create`
> **POST**
>
> Expects `t_name`, `t_type`, `t_desc`, `t_date`, `t_time`
>
> Wil attempt to create a new tournament.
>
> Returns `tournament_id` on success.
>
> Requires you to have an account.

- `/[id]`
> **GET**
>
> Will return metadata and bracket data for a specified tournament by `id`.
>
>
> **PATCH**
>
> Changes metadata of the tournament.
>
> Requires you to be an administrator of the tournament.

- `/[id]/teams`
> **POST**
>
> Adds a team to the bracket, **only available before the tournament begins**.
>
> Requires you to be an administrator of the tournament.

todo need bracket updates (wins, losses etc).
