import { stripe } from "@/lib/stripe";
import { redirect } from "next/navigation";

export default async function Success({
  searchParams,
}: {
  searchParams: { session_id: string };
}) {
  const { session_id } = await searchParams;

  if (!session_id) {
    throw new Error("Session ID is required");
  }

  const {
    status,
    customer_details: { email: customerEmail },
  } = await stripe.checkout.sessions.retrieve(session_id, {
    expand: ["line_items", "payment_intent"],
  });

  if (status === "open") return redirect("/");

  if (status === "complete") {
    return (
      <div>
        <p>Obrigado pela compra, {customerEmail}</p>
      </div>
    );
  }
}
