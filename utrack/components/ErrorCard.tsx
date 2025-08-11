import { Card, CardContent } from "@components/ui/Card";

export default function ErrorCard({ message }: { message: string }) {
    return (
        <Card className="bg-red-50 border-red-300">
            <CardContent className="p-4 text-red-700">
                {message}
            </CardContent>
        </Card>
    );
}
