import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, Users, Plus, Trash2, ExternalLink } from "lucide-react";
import { toast } from "sonner";

interface MealSlot {
  id: string;
  date: string;
  time: string;
  signedUpBy: string;
  contactEmail: string;
  dietaryNotes: string;
}

export default function MealTrainCoordinator() {
  const [mealSlots, setMealSlots] = useState<MealSlot[]>([
    { id: "1", date: "", time: "12:00 PM", signedUpBy: "", contactEmail: "", dietaryNotes: "" },
    { id: "2", date: "", time: "6:00 PM", signedUpBy: "", contactEmail: "", dietaryNotes: "" },
  ]);

  const [newSlot, setNewSlot] = useState({
    date: "",
    time: "12:00 PM"
  });

  const addMealSlot = () => {
    if (!newSlot.date) {
      toast.error("Please select a date");
      return;
    }

    const slot: MealSlot = {
      id: Date.now().toString(),
      date: newSlot.date,
      time: newSlot.time,
      signedUpBy: "",
      contactEmail: "",
      dietaryNotes: ""
    };

    setMealSlots([...mealSlots, slot]);
    setNewSlot({ date: "", time: "12:00 PM" });
    toast.success("Meal slot added");
  };

  const removeMealSlot = (id: string) => {
    setMealSlots(mealSlots.filter(slot => slot.id !== id));
    toast.success("Meal slot removed");
  };

  const updateMealSlot = (id: string, field: keyof MealSlot, value: string) => {
    setMealSlots(mealSlots.map(slot =>
      slot.id === id ? { ...slot, [field]: value } : slot
    ));
  };

  const sortedSlots = [...mealSlots].sort((a, b) => {
    if (!a.date) return 1;
    if (!b.date) return -1;
    return new Date(a.date).getTime() - new Date(b.date).getTime();
  });

  const filledSlots = mealSlots.filter(slot => slot.signedUpBy).length;
  const totalSlots = mealSlots.length;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="w-5 h-5" />
          Meal Train Coordinator
        </CardTitle>
        <CardDescription>
          Organize meals for the family during shiva. {filledSlots} of {totalSlots} slots filled.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Add New Slot */}
        <div className="bg-muted/50 p-4 rounded-lg space-y-4">
          <h4 className="font-semibold text-sm">Add Meal Slot</h4>
          <div className="grid md:grid-cols-3 gap-3">
            <div className="space-y-2">
              <Label htmlFor="newDate">Date</Label>
              <Input
                id="newDate"
                type="date"
                value={newSlot.date}
                onChange={(e) => setNewSlot({ ...newSlot, date: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="newTime">Time</Label>
              <Input
                id="newTime"
                type="time"
                value={newSlot.time}
                onChange={(e) => setNewSlot({ ...newSlot, time: e.target.value })}
              />
            </div>
            <div className="flex items-end">
              <Button onClick={addMealSlot} className="w-full gap-2">
                <Plus className="w-4 h-4" />
                Add Slot
              </Button>
            </div>
          </div>
        </div>

        {/* Meal Slots List */}
        <div className="space-y-4">
          {sortedSlots.map((slot) => (
            <div key={slot.id} className="border rounded-lg p-4 space-y-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-muted-foreground" />
                  <span className="font-medium">
                    {slot.date ? new Date(slot.date + 'T00:00:00').toLocaleDateString('en-US', { 
                      weekday: 'long', 
                      month: 'long', 
                      day: 'numeric' 
                    }) : 'No date set'}
                  </span>
                  <Clock className="w-4 h-4 text-muted-foreground ml-2" />
                  <span>{slot.time}</span>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removeMealSlot(slot.id)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>

              {slot.signedUpBy ? (
                <Badge variant="secondary" className="gap-1">
                  <Users className="w-3 h-3" />
                  Assigned
                </Badge>
              ) : (
                <Badge variant="outline">Available</Badge>
              )}

              <div className="grid md:grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label htmlFor={`name-${slot.id}`}>Volunteer Name</Label>
                  <Input
                    id={`name-${slot.id}`}
                    placeholder="Who's bringing the meal?"
                    value={slot.signedUpBy}
                    onChange={(e) => updateMealSlot(slot.id, 'signedUpBy', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor={`email-${slot.id}`}>Contact Email</Label>
                  <Input
                    id={`email-${slot.id}`}
                    type="email"
                    placeholder="volunteer@example.com"
                    value={slot.contactEmail}
                    onChange={(e) => updateMealSlot(slot.id, 'contactEmail', e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor={`notes-${slot.id}`}>Dietary Notes & Menu</Label>
                <Textarea
                  id={`notes-${slot.id}`}
                  placeholder="What they're bringing, dietary restrictions to consider..."
                  value={slot.dietaryNotes}
                  onChange={(e) => updateMealSlot(slot.id, 'dietaryNotes', e.target.value)}
                  rows={2}
                />
              </div>
            </div>
          ))}
        </div>

        {/* External Integration Info */}
        <div className="bg-primary/5 border border-primary/10 p-4 rounded-lg">
          <h4 className="font-semibold mb-2 flex items-center gap-2">
            <ExternalLink className="w-4 h-4" />
            External Meal Train Services
          </h4>
          <p className="text-sm text-muted-foreground mb-3">
            For more advanced features, you can also use dedicated meal train platforms:
          </p>
          <div className="flex flex-wrap gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => window.open('https://www.mealtrain.com', '_blank')}
            >
              MealTrain.com
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => window.open('https://www.takethemameal.com', '_blank')}
            >
              TakeThemAMeal.com
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => window.open('https://www.lotsahelpinghands.com', '_blank')}
            >
              Lotsa Helping Hands
            </Button>
          </div>
        </div>

        {/* Dietary Guidelines */}
        <div className="bg-muted p-4 rounded-lg">
          <h4 className="font-semibold mb-2">Kosher Dietary Guidelines:</h4>
          <ul className="space-y-1 text-sm text-muted-foreground">
            <li>• Confirm the family's level of kashrut observance</li>
            <li>• Provide sealed, certified kosher products when possible</li>
            <li>• Include ingredients list for homemade items</li>
            <li>• Consider dairy vs. meat meal separation</li>
            <li>• Avoid shellfish, pork, and mixing meat with dairy</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}