import { Truck, Cake, Gift, Trophy, ClipboardList, Heart, Cookie } from "lucide-react";

const features = [
	{
		icon: ClipboardList,
		title: "Made to order",
		desc: "freshness & quality, always.",
	},
	{
		icon: Heart,
		title: "100% handmade",
		desc: "Our products are handmade with love and care.",
	},
	{
		icon: Cookie,
		title: "Customizable",
		desc: "to meet your special requests & preferences.",
	},
	{
		icon: Cake,
		title: "Fresh to Order",
		desc: "Every cake is made after you order.",
	},
];

export function FeatureGrid() {
	return (
		<section className="bg-white py-6 sm:py-8 premium-gradient">
			<div className="max-w-5xl mx-auto px-4 grid grid-cols-2 gap-6 sm:gap-8">
				{features.map((feature, idx) => (
					<div
						key={idx}
						className="flex flex-col items-center text-center"
					>
						<feature.icon className="h-8 w-8 mb-3 text-amber-700 stroke-[0.9]" />
						<span className="font-semibold text-base text-gray-900 leading-tight mb-1">
							{feature.title}
						</span>
						{feature.desc && (
							<span className="text-gray-600 text-sm font-normal leading-snug">
								{feature.desc}
							</span>
						)}
					</div>
				))}
			</div>
		</section>
	);
}
