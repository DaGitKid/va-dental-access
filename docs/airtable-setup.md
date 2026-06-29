# Airtable setup for the patient-experience form

The Provider Finder page (`/find-a-dentist`) includes an Airtable form for collecting **anonymous, ZIP-level** patient feedback. Per Dental Desert's positioning ([see `feedback-no-dentist-targeting` in memory]), the form does not collect data tied to individual providers — only on the searcher's experience by ZIP.

## One-time setup

### 1. Create the Airtable base

1. Go to <https://airtable.com> and create an account (free tier is fine).
2. Create a new base named **Dental Desert · Patient Experience**.
3. Rename the default table to **Submissions**.
4. Set up these fields (delete the defaults first):

| Field name | Type | Options / notes |
|---|---|---|
| `zip` | Single line text | The user's Virginia ZIP code |
| `found_dentist` | Single select | Options: `Yes`, `No`, `Still calling` |
| `calls_needed` | Single select | Options: `1`, `2`, `3`, `4+`, `Haven't found one` |
| `submitted_at` | Created time | Auto-populated |

### 2. Create the public form

1. With the **Submissions** table open, click **+ Create…** → **Form**.
2. Title the form something like *"How was your dental search?"*
3. Add the three input fields (`zip`, `found_dentist`, `calls_needed`) — drag them in from the right panel.
4. Make `zip` and `found_dentist` required; `calls_needed` optional.
5. Top right: click **Share form** → **Embed this form on your site**.
6. Copy the iframe `src` URL. It looks like:
   ```
   https://airtable.com/embed/shrXXXXXXXXXXXXXX
   ```

### 3. Wire the form URL into the build

1. In the repo root, create a file named `.env.local`:
   ```bash
   echo "VITE_AIRTABLE_FORM_URL=https://airtable.com/embed/shrXXXXXXXXXXXXXX" > .env.local
   ```
   (Use your actual URL from step 6 above.)
2. The `.env.local` file is already gitignored (`*.local` in `.gitignore`) — your form URL stays local.
3. Rebuild: `npm run build`.
4. Re-upload the new `index.html` + the new `assets/index-XXXX.js` to Bluehost.

### 4. Verify it works

Visit `https://website-0ea15f30.kgd.cde.mybluehost.me/find-a-dentist` and scroll to the bottom. The Airtable form should be embedded as an iframe. Submit a test response and confirm it shows up in your Airtable base.

## Operating the data

- Anyone can submit (the form URL is public). No login required.
- All submissions land in your `Submissions` table. You can sort, filter, and analyze freely.
- For the dashboard or future research deliverables, you can pull aggregates **manually** from Airtable — or eventually swap in the Airtable Web API with a read-only token to display "calls-needed by region" stats on the site. (Don't expose any token that can write or delete; the public form is the only public endpoint by design.)

## Privacy / public communication

The form deliberately does not collect:
- The searcher's name or email
- Any provider-specific data
- Any free-text content (which could inadvertently name a provider)

If you ever want to add a free-text field, route that to a **separate** private table and clearly label the field as "We may quote anonymized responses publicly" so respondents consent. Anything that names individual dentists must stay private to the organization.
